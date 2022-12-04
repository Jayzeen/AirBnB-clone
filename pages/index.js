import { sanityClient, urlFor } from '../sanity'
import { isMultiple } from '../utils'
import Link from 'next/link'
import DashboardMap from '../components/dashboardMap'


const Home = ({ properties }) => {

  return (
    <>
      {properties && (
        <div className="main">
          <div className="feed-container">
            <div className="header-subtitle">
              <h1>Places to Stay near you</h1>
            </div>

            <div className="feed">
              {properties.map((property, index) => (
                <Link key={property._id} href={`property/${property.slug.current}`}>
                  <div key={property._id} className="card">
                    <img src={urlFor(property.mainImage)} />
                    <p>{property.reviews ? property.reviews.length : 0} review{isMultiple(property.reviews ? property.reviews.length : 0)} ⭐</p>
                    <h3>{property.title}</h3>
                    <h3 className="price-title">${property.pricePerNight}/per Night</h3>
                  </div>
                </Link>
              ))}
            </div>

            <div className="map">
              <DashboardMap properties={properties} />
            </div>

          </div>
        </div>
      )}
    </>
  )
}


export const getServerSideProps = async () => {
  const query = '*[ _type == "property"]'
  const properties = await sanityClient.fetch(query)

  if (!properties.length) {
    return {
      props: {
        properties: [],
      },
    }
  } else {
    return {
      props: {
        properties
      }
    }
  }

}


export default Home
