// Ce fichier permet de proteger les routes de l'application

import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: ["/api/:path*"],
});

export const config = { // Correspond a la config de next.config.js
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"], //Permet de proteger toutes les routes sauf les fichiers statiques et les routes api et trpc
};
