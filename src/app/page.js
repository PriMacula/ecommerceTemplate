// src/app/page.js
import DealsPromotions from "@/components/DealsPromotions/DealsPromotions";
import Hero from "@/components/Hero/Hero";
import Categories from "@/components/Categories/Categories";
import SocialMedia from "@/components/SocialMedia/SocialMedia";
import NewsLetter from "@/components/NewsLetter/NewsLetter";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Categories />
      <DealsPromotions />
      <NewsLetter />
      <SocialMedia />
    </div>
  );
}
