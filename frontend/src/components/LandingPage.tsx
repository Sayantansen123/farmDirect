import React, { useState, useEffect } from "react";
import {
  Leaf,
  Users,
  ShoppingCart,
  Truck,
  Star,
  ArrowRight,
  TrendingUp,
  Award,
  Heart,
  CheckCircle,
} from "lucide-react";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Local Customer",
      content:
        "The freshest vegetables I've ever bought! Supporting local farmers has never been easier.",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Organic Farmer",
      content:
        "FarmDirect helped me reach customers directly and get fair prices for my organic produce.",
      rating: 5,
    },
    {
      name: "Emma Davis",
      role: "Health Enthusiast",
      content:
        "I love knowing exactly where my food comes from. The quality is outstanding!",
      rating: 5,
    },
  ];

  const stats = [
    { number: "500+", label: "Happy Farmers", icon: Leaf },
    { number: "10K+", label: "Satisfied Customers", icon: Users },
    { number: "50K+", label: "Fresh Orders", icon: ShoppingCart },
    { number: "98%", label: "Customer Satisfaction", icon: Heart },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm fixed w-full top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center group">
              <div className="relative">
                <Leaf className="h-8 w-8 text-green-600 transform group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 bg-green-600 rounded-full opacity-20 scale-0 group-hover:scale-150 transition-all duration-500"></div>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                FarmDirect
              </span>
            </div>
            <button
              onClick={() => onNavigate("login")}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-full hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-16 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div
            className={`text-center transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 mb-6 shadow-lg">
              <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                Join 10,000+ happy customers
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Connecting{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 animate-pulse">
                Farmers
              </span>{" "}
              Directly
              <br />
              to Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                Table
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Skip the middleman and buy fresh, organic produce directly from
              local farmers. Support your community while getting the freshest
              ingredients at fair prices.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => onNavigate("login")}
                className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl inline-flex items-center"
              >
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={() => onNavigate("login")}
                className="group border-2 border-green-600 flex items-center justify-center text-green-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Join as Farmer
                <Leaf className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transform transition-all duration-700 delay-${
                  index * 100
                } ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-green-600 group-hover:animate-bounce" />
                </div>
                <div
                  className="text-3xl font-bold text-gray-900 mb-2 counter"
                  data-target={stat.number}
                >
                  {stat.number}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How FarmDirect Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, direct, and transparent farming marketplace
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: "Farmers List Products",
                description:
                  "Local farmers upload their fresh produce with prices, descriptions, and availability directly to our platform.",
                color: "green",
                delay: "0",
              },
              {
                icon: ShoppingCart,
                title: "Customers Browse & Buy",
                description:
                  "Browse fresh produce by category, add items to cart, and purchase directly from farmers in your area.",
                color: "blue",
                delay: "200",
              },
              {
                icon: Truck,
                title: "Direct Delivery",
                description:
                  "Farmers coordinate direct delivery or pickup, ensuring maximum freshness and fair pricing.",
                color: "orange",
                delay: "400",
              },
            ].map((step, index) => (
              <div
                key={index}
                className={`group text-center transform transition-all duration-700 delay-${
                  step.delay
                } hover:scale-105 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div
                  className={`bg-${step.color}-100 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300 relative overflow-hidden`}
                >
                  <div
                    className={`absolute inset-0 bg-${step.color}-200 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-3xl`}
                  ></div>
                  <step.icon
                    className={`h-10 w-10 text-${step.color}-600 relative z-10 group-hover:animate-pulse`}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-green-600 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose FarmDirect?
              </h2>
              {[
                {
                  icon: Star,
                  title: "Fresh & Quality",
                  description:
                    "Get the freshest produce directly from farms, harvested at peak ripeness.",
                  color: "yellow",
                },
                {
                  icon: Users,
                  title: "Support Local Farmers",
                  description:
                    "Help local farming communities thrive by buying directly from them.",
                  color: "green",
                },
                {
                  icon: Award,
                  title: "Fair Pricing",
                  description:
                    "No middleman markups - fair prices for both farmers and consumers.",
                  color: "blue",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start group hover:bg-gray-50 p-4 rounded-2xl transition-all duration-300"
                >
                  <div
                    className={`bg-${benefit.color}-100 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    <benefit.icon
                      className={`h-6 w-6 text-${benefit.color}-600`}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl transform rotate-3 opacity-20"></div>
              <img
                src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Fresh vegetables"
                className="relative rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="font-semibold text-gray-900">
                    100% Fresh
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from farmers and customers
            </p>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center transform transition-all duration-500">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  )
                )}
              </div>
              <blockquote className="text-xl text-gray-700 mb-6 italic">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              <div>
                <p className="font-semibold text-gray-900">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-green-600">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
            </div>

            {/* Testimonial Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-green-600 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full transform -translate-x-20 -translate-y-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white opacity-10 rounded-full transform translate-x-20 translate-y-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of customers and farmers who are already part of the
            FarmDirect community.
          </p>
          <button
            onClick={() => onNavigate("login")}
            className="group bg-white text-green-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl inline-flex items-center"
          >
            Join FarmDirect Today
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center group">
            <Leaf className="h-8 w-8 text-green-500 group-hover:rotate-12 transition-transform duration-300" />
            <span className="ml-2 text-xl font-bold group-hover:text-green-400 transition-colors duration-300">
              FarmDirect
            </span>
          </div>
          <p className="text-center text-gray-400 mt-4">
            Connecting communities through fresh, local produce
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
