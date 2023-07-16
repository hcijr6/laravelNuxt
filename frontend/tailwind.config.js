/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    container: {
      center: true,
      padding: "20px",
      screens: {
        "2xl": "1248px",
      },
    },
    extend: {
      backgroundImage: {
        'mainPattern': "var(--pattern)",
      },
      fontSize: {
        'fluid-xl': 'clamp(2.5rem, 1.8333333333333335rem + 3.3333333333333335vw, 4.5rem)',
        'fluid-lg': 'clamp(3.27rem, calc(2.31rem + 4.79vw), 3.8rem)',
      },
      gridTemplateColumns: {
        'fill-15': 'repeat(auto-fill, minmax(15rem, 1fr))',
        'fill-25': 'repeat(auto-fill, minmax(25, 1fr))',
        // etc.
      },
      spacing: {
        'fluid-1': 'clamp(1.31rem, calc(0.65rem + 3.29vw), 3.00rem)',
        'fluid-2': 'clamp(1.31rem, calc(0.07rem + 6.22vw), 4.50rem)',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--solid))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        solid: {
          DEFAULT: "hsl(var(--solid))",
          foreground: "hsl(var(--solid-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    // ...
  ],
};