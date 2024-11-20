import { ProductButtons, ProductCard, ProductImage, ProductTitle } from '../components'
import '../styles/custom-styles.css'
import { useShoppingCart } from '../hooks/useShoppingCart'
import { products } from '../data/products'

export const ShoppingPage = () => {

  const {shoppingCart, onProductCountChange} = useShoppingCart()
 
  return (
    <div>
      <h1>Shopping Store</h1>
      <hr />

      <div style={{
        display:"flex",
        flexDirection: "row",
        flexWrap: 'wrap'
      }}>
        {
          products.map( product => (
            <ProductCard
              key={ product.id } 
              className='bg-dark text-white'
              product={ product }
              onChange={ onProductCountChange }
              value={ shoppingCart[product.id]?.count || 0 }
              > 
              <ProductImage
                style={{
                  boxShadow: '10px 10px 10px rgba(0,0,0,0.2)'
                }} 
                className='custom-image'/>
              <ProductTitle className='text-bold'/>
              <ProductButtons className='custom-buttons' />
            </ProductCard>
          ))
        }        
      </div>

      <div className='shopping-cart'>
        {
          shoppingCart && Object.entries(shoppingCart).map( ([key, prod]) => (
            <ProductCard
              key={ key }
              className='bg-dark text-white'
              product={ prod }
              style={{ width: '100px' }}
              value={ prod.count }
              onChange={ onProductCountChange }
              > 
                <ProductImage
                  style={{
                    boxShadow: '10px 10px 10px rgba(0,0,0,0.2)'
                  }} 
                  className='custom-image'/>
                <ProductButtons
                  style={{
                    display: 'flex',
                    justifyContent: 'center'
                  }} 
                  className='custom-buttons' 
                />
            </ProductCard>
          ))
        } 
      </div>
    </div>
  )
}
