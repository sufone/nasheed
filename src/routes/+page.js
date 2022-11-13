// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;

// no ssr - till i move the random code here server only, and it generates a whole array that can be run through. 
// then i can do ssr without prerender, so the random is generated on each page request.
export const ssr = false;
