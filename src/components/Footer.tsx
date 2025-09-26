import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mail } from "lucide-react";
import { socialLinks, navigation } from "./FooterConfig";
export function Footer() {

  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        {/* <div className="py-12 border-b border-border/50">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h3 className="text-2xl font-bold">Subscribe for Updates</h3>
            <p className="text-muted-foreground leading-relaxed">
              Get the latest updates on TTSwap development, new features, and ecosystem growth
            </p>
            <div className="flex max-w-md mx-auto space-x-2">
              <Input
                placeholder="Enter your email"
                className="bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50"
              />
              <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Subscribe
              </Button>
            </div>
          </div>
        </div> */}

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center space-x-2 group">

                <img src="/img/logo.png" alt="TTSwap Logo" className="w-9 h-9 rounded-lg" />
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  TTSwap
                </span>
              </div>
              <p className="text-muted-foreground max-w-xs leading-relaxed">
                Revolutionary DeFi protocol that eliminates impermanent loss and reduces 50%+ trading costs through constant value algorithms.
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      className="w-10 h-10 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Product Links */}
            <div className="space-y-4">
              <h4 className="font-semibold">Trade</h4>
              <nav className="space-y-2">
                {navigation.product.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    className="block text-sm text-muted-foreground hover:text-primary transition-all duration-300"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Resources Links */}
            <div className="space-y-4">
              <h4 className="font-semibold">Docs</h4>
              <nav className="space-y-2">
                {navigation.resources.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-sm text-muted-foreground hover:text-primary transition-all duration-300"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Community Links */}
            <div className="space-y-4">
              <h4 className="font-semibold">Community</h4>
              <nav className="space-y-2">
                {navigation.community.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-sm text-muted-foreground hover:text-primary transition-all duration-300"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Company Links */}
            {/* <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <nav className="space-y-2">
                {navigation.company.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-sm text-muted-foreground hover:text-primary transition-all duration-300"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div> */}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2025 TTSwap. All rights reserved.
            </div>
            {/* <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              {["Privacy Policy", "Terms of Service", "Security"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-primary transition-all duration-300"
                >
                  {item}
                </a>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}