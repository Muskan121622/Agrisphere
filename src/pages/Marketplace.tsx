import { motion } from "framer-motion";
import { ShoppingBag, TrendingUp, Users, Truck, Shield, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Marketplace = () => {
  const marketplaceFeatures = [
    {
      title: "Direct Farmer-Buyer Connection",
      description: "Eliminate middlemen and connect directly with buyers for better prices",
      icon: "🤝",
      benefit: "30% higher prices",
      features: ["Direct Contact", "Verified Buyers", "Bulk Orders", "Contract Farming"]
    },
    {
      title: "AI-Powered Pricing",
      description: "Smart pricing recommendations based on market trends and quality",
      icon: "💰",
      benefit: "Optimal pricing",
      features: ["Market Analysis", "Quality Assessment", "Price Trends", "Profit Optimization"]
    },
    {
      title: "Logistics Integration",
      description: "End-to-end logistics support from farm gate to buyer location",
      icon: "🚛",
      benefit: "Hassle-free delivery",
      features: ["Transport Booking", "Cold Chain", "Tracking", "Insurance"]
    },
    {
      title: "Quality Certification",
      description: "Blockchain-based quality certification and traceability",
      icon: "🏆",
      benefit: "Premium pricing",
      features: ["Quality Grades", "Organic Certification", "Traceability", "Authenticity"]
    }
  ];

  const productCategories = [
    { name: "Grains & Cereals", products: 150, icon: "🌾", avgPrice: "₹2,500/quintal" },
    { name: "Fruits", products: 89, icon: "🍎", avgPrice: "₹4,200/quintal" },
    { name: "Vegetables", products: 120, icon: "🥕", avgPrice: "₹3,800/quintal" },
    { name: "Pulses & Legumes", products: 67, icon: "🫘", avgPrice: "₹5,500/quintal" },
    { name: "Spices", products: 45, icon: "🌶️", avgPrice: "₹8,900/quintal" },
    { name: "Dairy Products", products: 34, icon: "🥛", avgPrice: "₹45/liter" }
  ];

  const successStories = [
    {
      farmer: "Ramesh Kumar",
      location: "Punjab",
      crop: "Wheat",
      improvement: "₹3,500 extra per quintal",
      story: "Connected directly with flour mills, eliminated 3 middlemen",
      rating: 5
    },
    {
      farmer: "Sunita Devi",
      location: "Maharashtra",
      crop: "Tomatoes",
      improvement: "₹2,800 extra per quintal",
      story: "Organic certification helped get premium prices from restaurants",
      rating: 5
    },
    {
      farmer: "Arjun Patel",
      location: "Gujarat",
      crop: "Cotton",
      improvement: "₹4,200 extra per quintal",
      story: "Contract farming with textile companies, guaranteed prices",
      rating: 5
    }
  ];

  const buyerTypes = [
    { type: "Food Processing Companies", count: "250+", icon: "🏭" },
    { type: "Retail Chains", count: "180+", icon: "🏪" },
    { type: "Export Companies", count: "120+", icon: "🌍" },
    { type: "Restaurants & Hotels", count: "300+", icon: "🍽️" },
    { type: "Wholesale Markets", count: "450+", icon: "🏬" },
    { type: "Government Agencies", count: "85+", icon: "🏛️" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-bold gradient-text">AgriSphere AI</span>
          </div>
        </div>
      </header>
      {/* Header */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Farmer-Buyer Marketplace
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Direct marketplace connecting farmers with buyers, eliminating middlemen, 
              ensuring fair prices, and providing end-to-end logistics support.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary">
                <ShoppingBag className="mr-2 w-5 h-5" />
                List Your Produce
              </Button>
              <Button size="lg" variant="outline">
                <Users className="mr-2 w-5 h-5" />
                Find Buyers
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marketplace Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Marketplace Features</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {marketplaceFeatures.map((feature, i) => (
              <Card key={i} className="p-8 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <div className="bg-primary/20 px-3 py-1 rounded-full text-primary font-bold text-sm">
                        {feature.benefit}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {feature.features.map((item, idx) => (
                        <div key={idx} className="text-xs bg-muted px-2 py-1 rounded text-center">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Product Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {productCategories.map((category, i) => (
              <Card key={i} className="p-6 text-center hover:shadow-lg transition-all duration-300 group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-bold mb-2">{category.name}</h3>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Products:</span>
                  <span className="font-medium">{category.products}</span>
                </div>
                <div className="bg-primary/20 px-2 py-1 rounded-full text-primary font-bold text-sm">
                  {category.avgPrice}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Farmer Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {successStories.map((story, i) => (
              <Card key={i} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold">{story.farmer}</h3>
                    <p className="text-sm text-muted-foreground">{story.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-1 mb-1">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <div className="text-xs bg-primary/20 px-2 py-1 rounded-full text-primary">
                      {story.crop}
                    </div>
                  </div>
                </div>
                <div className="bg-accent/20 px-3 py-2 rounded-lg mb-3">
                  <p className="font-bold text-accent">{story.improvement}</p>
                </div>
                <p className="text-sm text-muted-foreground italic">"{story.story}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Buyer Network */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Our Buyer Network</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {buyerTypes.map((buyer, i) => (
              <Card key={i} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-3">{buyer.icon}</div>
                <h3 className="font-bold mb-2">{buyer.type}</h3>
                <div className="bg-primary/20 px-3 py-1 rounded-full text-primary font-bold">
                  {buyer.count}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How Marketplace Works</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: "1", title: "List Produce", desc: "Upload product details & photos", icon: ShoppingBag },
              { step: "2", title: "Get Quotes", desc: "Receive buyer quotes & negotiate", icon: TrendingUp },
              { step: "3", title: "Confirm Order", desc: "Accept best offer & confirm deal", icon: Shield },
              { step: "4", title: "Delivery", desc: "Arrange pickup & get payment", icon: Truck }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xl">
                  {item.step}
                </div>
                <item.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">Marketplace Benefits</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { title: "Higher Prices", desc: "30% more than traditional markets", icon: "💰" },
              { title: "Direct Sales", desc: "No middlemen commission", icon: "🤝" },
              { title: "Quality Premium", desc: "Extra for certified produce", icon: "⭐" },
              { title: "Guaranteed Payment", desc: "Secure payment system", icon: "🔒" }
            ].map((benefit, i) => (
              <Card key={i} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="font-bold mb-2 text-primary">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Marketplace;