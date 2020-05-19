/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbarclass} from './navbar'
export {default as CategoryBar} from './CategoryBar'
export {default as UserHome} from './user-home'
export {Home} from './home/home'
export {HomeCarousel} from './home/HomeCarousel'
export {HomeFooter} from './home/HomeFooter'
export {Login, Signup} from './auth-form'
export {default as Products} from './products'
export {default as Product} from './product'
export {default as Search} from './Search'
export {default as Orders} from './orders'
export {default as DisplaySearch} from './DisplaySearch'
export {default as Cart} from './cart'
export {default as DisplayByCategory} from './DisplayByCategory'
export {default as InjectedCheckoutForm} from './Checkout'
export {default as ProductCard} from './ProductCard'
export {default as OrderSummary} from './OrderSummary'
