import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_secret_key_change_me_in_production",
);

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // Paths that don't require authentication
  if (
    pathname === "/login" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/login_background")
  ) {
    // If user is already logged in and tries to access /login, redirect to /admin
    if (pathname === "/login" && token) {
      try {
        const { payload } = await jwtVerify(token, SECRET);
        const role = payload.role as string;

        // If it's a guest, check if the window is still valid before auto-redirecting to /admin
        if (role === "GUEST") {
          const now = new Date();
          const from = payload.accessibleFrom
            ? new Date(payload.accessibleFrom as string)
            : null;
          const until = payload.accessibleUntil
            ? new Date(payload.accessibleUntil as string)
            : null;

          if ((from && now < from) || (until && now > until)) {
            // Invalid window, let them see the login page
            return NextResponse.next();
          }
        }

        return NextResponse.redirect(new URL("/admin", request.url));
      } catch (e) {
        // Token invalid, continue to login
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // Protect /admin and /api
  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    if (!token) {
      if (pathname.startsWith("/api")) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const { payload } = await jwtVerify(token, SECRET);
      const role = payload.role as string;

      // Guest access window control
      if (role === "GUEST") {
        const now = new Date();
        const from = payload.accessibleFrom
          ? new Date(payload.accessibleFrom as string)
          : null;
        const until = payload.accessibleUntil
          ? new Date(payload.accessibleUntil as string)
          : null;

        if ((from && now < from) || (until && now > until)) {
          if (pathname.startsWith("/api")) {
            return NextResponse.json(
              { message: "Access expired or not yet available" },
              { status: 403 },
            );
          }
          // Redirect back to login with a clear error
          return NextResponse.redirect(
            new URL("/login?error=access_window", request.url),
          );
        }
      }

      // Role-based access for /admin
      // Requirements specify: ADMIN, AUTHORIZED, COOPERATED, GUEST
      if (pathname.startsWith("/admin")) {
        const allowedRoles = ["ADMIN", "AUTHORIZED", "COOPERATED", "GUEST"];
        if (!allowedRoles.includes(role)) {
          return NextResponse.redirect(new URL("/", request.url));
        }
      }

      return NextResponse.next();
    } catch (error) {
      if (pathname.startsWith("/api")) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*", "/login"],
};
