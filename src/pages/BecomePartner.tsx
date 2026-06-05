import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users, Award, TrendingUp, Phone, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BecomePartner = () => {
  const benefits = [
    {
      icon: Users,
      title: 'Extensive Network',
      description: 'Join our growing network of successful poultry equipment distributors across India'
    },
    {
      icon: Award,
      title: 'Premium Products',
      description: 'Access to our complete range of high-quality, innovative poultry equipment and solutions'
    },
    {
      icon: TrendingUp,
      title: 'Business Growth',
      description: 'Comprehensive business support, training, and marketing assistance to maximize your success'
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'All products come with warranty, technical support, and after-sales service guarantee'
    }
  ];

  const requirements = [
    'Established business with relevant industry experience',
    'Strong financial background and business credentials',
    'Dedicated warehouse and display space',
    'Committed sales and technical support team',
    'Coverage area with substantial poultry farming presence',
    'Commitment to brand values and customer service excellence'
  ];

  const supportOffered = [
    'Product training and technical certification',
    'Marketing materials and promotional support',
    'Territory protection and exclusivity rights',
    'Regular business development assistance',
    'Competitive pricing and attractive margins',
    'Ongoing technical and after-sales support'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-primary/10 via-primary/5 to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Become Our <span className="text-primary">Partner</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-10"
          >
            Join SVR Poultry Equipments as an authorized partner and grow your business with India's leading poultry equipment manufacturer
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 px-10 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Start Partnership Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Why Partner With Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the advantages of being an SVR Poultry Equipments authorized partner
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements and Support Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white shadow-xl border-0 rounded-2xl">
                <CardContent className="p-10">
                  <h3 className="text-3xl font-bold text-gray-900 mb-8">Partnership Requirements</h3>
                  <div className="space-y-4">
                    {requirements.map((requirement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 leading-relaxed">{requirement}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Support Offered */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white shadow-xl border-0 rounded-2xl">
                <CardContent className="p-10">
                  <h3 className="text-3xl font-bold text-gray-900 mb-8">Support We Provide</h3>
                  <div className="space-y-4">
                    {supportOffered.map((support, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 leading-relaxed">{support}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Partner With Us?</h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Take the first step towards a successful partnership. Contact our business development team today.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center space-x-4 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl"
              >
                <Phone className="w-8 h-8 text-primary" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Call Us</p>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center space-x-4 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl"
              >
                <Mail className="w-8 h-8 text-primary" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Email Us</p>
                  <p className="text-gray-600">partners@svrpoultry.com</p>
                </div>
              </motion.div>
            </div>

            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 px-12 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Contact Us Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BecomePartner;
