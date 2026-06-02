# UI REDESIGN SPEC - TAN HUONG PHAT WEBSITE

## 🎯 Goal

Redesign the current website UI to match a luxury beauty brand style.

Requirements:
- Keep existing data, API, and backend
- Only redesign UI components and layout
- Use modern, clean, high-end aesthetic
- Mobile-first, responsive design

---

# 🎨 DESIGN SYSTEM

## Color Palette

Primary:
- Green (brand): #2F5D50

Accent:
- Gold: #D4AF37

Background:
- Light cream: #FDFBF7
- White: #FFFFFF

Text:
- Dark: #1A1A1A
- Secondary: #6B7280

---

## Typography

Headings:
- Serif font (e.g. Playfair Display)

Body:
- Sans-serif (Inter / system-ui)

---

## UI Style

- Border radius: 12px–16px
- Soft shadow: shadow-md / shadow-lg
- Clean spacing
- No heavy borders
- Minimal, premium look

---

# 🧱 PAGE STRUCTURE

## 1. HEADER

### Requirements

- Sticky header
- Transparent at top
- On scroll → white background + shadow

### Layout

Left:
- Logo

Center:
- Navigation (Trang chủ, Sản phẩm, Về chúng tôi, Liên hệ)

Right:
- Hotline
- CTA button: "Liên hệ ngay"

### CTA Style

- Background: Gold
- Text: White
- Rounded
- Hover: darker gold + shadow

---

## 2. HERO SECTION

### Layout

- Full width section
- Background image (model + product)
- Dark overlay (rgba(0,0,0,0.4))

### Content

- Title (large serif)
- Subtitle
- CTA button

### Style

- Text centered
- Max width ~700px
- CTA:
  - Large button
  - Gold background
  - Hover scale + shadow

---

## 3. CORE VALUES (3 CARDS)

### Layout

- Grid 3 columns (mobile: 1 column)
- Centered

### Each Card

- Icon (line style)
- Title
- Description

### Style

- White background
- Rounded-xl
- Shadow-sm
- Padding: 24px

---

## 4. PRODUCT CATEGORIES

### IMPORTANT CHANGE

❌ Do NOT use image with text inside  
✅ Separate image and content

---

### Layout

- Grid 2 columns
- Each = Product Card

---

### Product Card

Top:
- Product image (clean, no text)

Bottom:
- Title
- Bullet points
- CTA button

---

### Style

- White card
- Rounded-xl
- Hover:
  - translateY(-4px)
  - shadow-lg

---

## 5. FEATURE PRODUCT (CALUO.BER)

### Layout

Split 2 columns

Left:
- Large product image

Right:
- Title
- Description
- Feature list

---

### Feature List

Each item:
- Icon check
- Short text

---

### Style

- Lots of whitespace
- No boxed text blocks
- Clean list layout

---

## 6. FOOTER

### Layout

4 columns

1. Logo + description  
2. Quick links  
3. Contact info  
4. Social links  

---

### Style

- Background: dark green (#1F3D35)
- Text: white
- Spacing large

---

# ⚙️ COMPONENT STRUCTURE (NEXT.JS)

## Suggested Components

/components
  /layout
    Header.tsx
    Footer.tsx

  /sections
    Hero.tsx
    CoreValues.tsx
    ProductGrid.tsx
    FeatureProduct.tsx

  /ui
    Button.tsx
    Card.tsx
    Section.tsx

---

# 🧠 CODING RULES

- Use Tailwind CSS only
- No inline styles
- No CSS files
- Reusable components
- Clean JSX

---

# 📱 RESPONSIVE

Mobile rules:

- Hero text center
- Grid → 1 column
- Buttons full width
- Padding smaller

---

# ✨ INTERACTIONS

- Hover scale on cards
- Button hover shadow
- Smooth transition (duration-300)

---

# 🚫 AVOID

- Text inside images
- Heavy borders
- Too many colors
- Cluttered layout

---

# 🎯 FINAL RESULT

The UI should feel:

- Premium
- Clean
- Modern
- Beauty brand level
- Similar to high-end cosmetic landing pages