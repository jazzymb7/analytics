import { NextResponse } from "next/server";
import { analytics } from "./utils/analytics";

export default async function middleware(req) {
  if (req.nextUrl.pathname === "/") {
    //track analytics event
    try {
      analytics.track("pageview", {
        page: "/",
        country: req.geo?.country,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return NextResponse.next();
}

export const matcher = {
  matcher: ["/"],
};
