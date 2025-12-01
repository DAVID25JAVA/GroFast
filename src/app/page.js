import BestSellers from "@/components/UI/BestSellers"
import Category from "@/components/UI/Category"
import HeroSection from "@/components/UI/HeroSection"
import NewsLetter from "@/components/UI/NewsLetter"

function Home() {
  return (
    <div>
      <HeroSection />
      <Category />
      <BestSellers />
      <NewsLetter />
    </div>
  )
}

export default Home