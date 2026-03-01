import Link from 'next/link';
import { FaTwitter, FaInstagram, FaTiktok, FaDiscord, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark-900/80 backdrop-blur-md border-t border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold tilago-violet-gradient bg-clip-text text-transparent mb-4">Tilago</h3>
            <p className="text-gray-400 mb-4">
              Premium digital marketplace for stream alerts, editing assets, overlays, templates, and custom design services.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-tilago-accent transition-colors">
                <FaTwitter size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-tilago-accent transition-colors">
                <FaInstagram size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-tilago-accent transition-colors">
                <FaTiktok size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-tilago-accent transition-colors">
                <FaDiscord size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-tilago-accent transition-colors">
                <FaYoutube size={20} />
              </Link>
            </div>
          </div>

          {/* Products */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Products</h4>
            <ul className="space-y-2">
              <li><Link href="/products?category=stream-alerts" className="text-gray-400 hover:text-tilago-accent transition-colors">Stream Alerts</Link></li>
              <li><Link href="/products?category=editing-assets" className="text-gray-400 hover:text-tilago-accent transition-colors">Editing Assets</Link></li>
              <li><Link href="/products?category=overlays" className="text-gray-400 hover:text-tilago-accent transition-colors">Overlays</Link></li>
              <li><Link href="/products?category=templates" className="text-gray-400 hover:text-tilago-accent transition-colors">Templates</Link></li>
              <li><Link href="/products?category=digital-packs" className="text-gray-400 hover:text-tilago-accent transition-colors">Digital Packs</Link></li>
              <li><Link href="/products?category=custom-design" className="text-gray-400 hover:text-tilago-accent transition-colors">Custom Design</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-tilago-accent transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-tilago-accent transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-tilago-accent transition-colors">FAQ</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-tilago-accent transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-tilago-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/support" className="text-gray-400 hover:text-tilago-accent transition-colors">Help Center</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-tilago-accent transition-colors">Returns</Link></li>
              <li><Link href="/licensing" className="text-gray-400 hover:text-tilago-accent transition-colors">Licensing</Link></li>
              <li><Link href="/security" className="text-gray-400 hover:text-tilago-accent transition-colors">Security</Link></li>
              <li><Link href="/status" className="text-gray-400 hover:text-tilago-accent transition-colors">System Status</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Tilago Digital Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;