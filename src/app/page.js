import BestSellers from "@/components/UI/BestSellers"
import Category from "@/components/UI/Category"
import HeroSection from "@/components/UI/HeroSection"
import NewsLetter from "@/components/UI/NewsLetter"
import Testimonial from "@/components/UI/Testimonial"

function Home() {
  return (
    <div>
      <HeroSection />
      <Category />
      <BestSellers />
      <Testimonial />
      <NewsLetter />
    </div>
  )
}

export default Home