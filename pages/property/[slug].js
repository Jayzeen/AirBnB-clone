import { sanityClient } from '../../sanity'
import { isMultiple } from '../../utils'
import Image from '../../components/image'
import Map from '../../components/map'
import Link from 'next/link'
import ReviewSlider from '../../components/Slider/reviewSlider'

// Import Swiper React components
import { FreeMode, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/free-mode";


const Property = ({
    title,
    location,
    propertyType,
    mainImage,
    images,
    pricePerNight,
    beds,
    bedrooms,
    description,
    host,
    reviews,
}) => {

    const reviewAmount = reviews ? reviews.length : 0

    return (
        <div className="container">
            <h1 className="container-heading">{title}</h1>

            <div className="images-section">
                <Image identifier="main-image" image={mainImage} />
                <div className="sub-images-section">
                    {images.map(({ _key, asset }, image) => (
                        <Image key={_key} identifier="image" image={asset} />
                    ))}
                </div>
            </div>

            <div className="section">
                <div className="information">
                    <h2><b>{propertyType} hosted by {host?.name}</b></h2>
                    <h4>🛏️ {bedrooms} bedroom{isMultiple(bedrooms)} * {beds} bed{isMultiple(beds)} 🛏️</h4>

                    <hr />
                    <h4>
                        <b>🧽🧼 Enhanced Clean 🍽️✨</b>
                    </h4>
                    <p>This host is committed to Airbnb&apos;s 5-step enhanced cleaning process.</p>
                    <h4>
                        <b>🧴 Amenities for everyday living 🍽️</b>
                    </h4>
                    <p>
                        The host has equipped this place for long stays - kitchen, shampoo,
                        conditioner, hairdryer included.
                    </p>
                    <h4>
                        <b>🏠 House rules 📝</b>
                    </h4>
                    <p>
                        This place isn&apos;t suitable for pets and the host does not allow
                        parties or smoking.
                    </p>
                </div>

                {/* Prices and reviews */}
                <div className="price-box">
                    <h2>${pricePerNight}</h2>
                    <h4>{reviewAmount} review{isMultiple(reviewAmount)}</h4>
                    <Link href="/"><div className="button">Change Dates</div></Link>
                </div>
            </div>

            {/* Descriptions */}
            <hr />
            <div className="description"><h4>{description}</h4></div>
            <hr />

            { reviewAmount > 0 && <h2 className="review-heading">{reviewAmount} review{isMultiple(reviewAmount)}</h2> }
            <div>
                <Swiper
                    loop={true}
                    freeMode={true}
                    modules={[Autoplay, FreeMode]}
                    speed={1000}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView:  reviewAmount < 2 ? 1: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: reviewAmount < 3 ? 1: 3,
                            spaceBetween: 50,
                        },
                    }}
                    className="mySwiper"
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}

                >
                    {
                        reviewAmount > 0 && reviews.map((review) =>
                            <SwiperSlide key={review._key}>
                                <ReviewSlider key={review._key} review={review} />
                            </SwiperSlide>
                        )}
                </Swiper>
            </div>

            <hr />
            <h2>Location</h2>
            <Map location={location}></Map>

        </div>

    )
}


export const getServerSideProps = async (pageContext) => {
    const pageSlug = pageContext.query.slug

    const query = `*[ _type == "property" && slug.current == $pageSlug][0]{
        title,
        location,
        propertyType,
        mainImage,
        images,
        pricePerNight,
        beds,
        bedrooms,
        description,
        host->{
          _id,
          name,
          slug,
          image
        },
        reviews[]{
          ...,
          traveller->{
            _id,
            name,
            slug,
            image
          }
        }
      }`

    const property = await sanityClient.fetch(query, { pageSlug })

    if (!property) {
        return {
            props: null,
            notFound: true,
        }
    } else {
        return {
            props: {
                title: property.title,
                location: property.location,
                propertyType: property.propertyType,
                mainImage: property.mainImage,
                images: property.images,
                pricePerNight: property.pricePerNight,
                beds: property.beds,
                bedrooms: property.bedrooms,
                description: property.description,
                host: property.host,
                reviews: property.reviews ? property.reviews : null,
            }
        }
    }

}


export default Property