import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/api/uploadthing", "/", "/sign-in", "/sign-up", "/about", "/how-works",
     "/services/customized-products",
    "/services/development-of-iot-web-platforms-for-greenhouses",
    "/services/installation-and-maintenance",
    "/services/remote-support-ecosystem",
    "/services/advanced-data-analysis-and-optimization-of-agricultural-processes",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};