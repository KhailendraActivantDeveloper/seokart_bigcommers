import createMiddleware from 'next-intl/middleware';
import {locales} from './lungConfig'

export default createMiddleware({
  locales,
  defaultLocale: "en"
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fr|en|cn|de|it|ja|pt|ru|tw|es)/:path*']
};
