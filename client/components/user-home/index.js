export {default} from './user-home'

export {default as WelcomeUser} from './welcome-user'

//user
export {default as Orders} from './user-comps/orders'
export {default as Reviews} from './user-comps/reviews'

//admin
export {default as UserList} from './user-admin-comps/user-list'
export {default as OrderList} from './user-admin-comps/order-list'
export {default as ProductList} from './user-admin-comps/product-list'
export {
  ProductCreate,
  ProductUpdate,
} from './user-actions/product-create-update'

//forms
export {default as UserUpdate} from './user-actions/user-update'
