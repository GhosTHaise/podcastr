import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

/* const isDashboardRoute = createRouteMatcher(['/dashboard(.*)']);
const isAdminRoute = createRouteMatcher(['/admin(.*)']); */
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', "/sign-up(.*)", "/"])

export default clerkMiddleware((auth, req) => {
    // Restrict admin route to users with specific role
    if (!isPublicRoute(req)) auth().protect();

}, { debug: true });

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};