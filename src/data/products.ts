import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'serum-vitamin-c',
    name: 'Serum Vitamin C dưỡng sáng',
    category: 'Chăm Sóc Da',
    description:
      'Serum dưỡng sáng da với 15% Vitamin C nguyên chất, giúp làm mờ thâm nám và đều màu da sau 4 tuần sử dụng.',
    price: '890.000₫',
    tags: ['Dưỡng sáng', 'Chống oxy hóa', 'Mờ thâm'],
    featured: true,
  },
  {
    id: 'kem-duong-am',
    name: 'Kem Dưỡng Ẩm Phục Hồi',
    category: 'Chăm Sóc Da',
    description:
      'Kem dưỡng ẩm sâu với Hyaluronic Acid và Ceramide, phục hồi hàng rào bảo vệ da, giữ ẩm suốt 48 giờ.',
    price: '750.000₫',
    tags: ['Dưỡng ẩm', 'Phục hồi', 'Ceramide'],
    featured: true,
  },
  {
    id: 'sua-rua-mat',
    name: 'Sữa Rửa Mặt Dịu Nhẹ',
    category: 'Làm Sạch',
    description:
      'Sữa rửa mặt pH 5.5 với chiết xuất trà xanh và centella, làm sạch dịu nhẹ không khô da.',
    price: '450.000₫',
    tags: ['Làm sạch', 'Dịu nhẹ', 'pH 5.5'],
    featured: true,
  },
  {
    id: 'kem-chong-nang',
    name: 'Kem Chống Nắng SPF50+ PA++++',
    category: 'Chống Nắng',
    description:
      'Kem chống nắng phổ rộng, kết cấu mỏng nhẹ không bết dính, bảo vệ da khỏi tia UVA/UVB.',
    price: '680.000₫',
    tags: ['SPF50+', 'PA++++', 'Không bết dính'],
    featured: false,
  },
  {
    id: 'tinh-chat-retinol',
    name: 'Tinh Chất Retinol 0.5%',
    category: 'Chống Lão Hóa',
    description:
      'Tinh chất retinol bọc vi nang giúp làm mờ nếp nhăn, cải thiện kết cấu da mà không gây kích ứng.',
    price: '1.200.000₫',
    tags: ['Retinol', 'Chống lão hóa', 'Bọc vi nang'],
    featured: false,
  },
  {
    id: 'mat-na-ngu',
    name: 'Mặt Nạ Ngủ Cấp Ẩm',
    category: 'Chăm Sóc Da',
    description:
      'Mặt nạ ngủ với squalane và vitamin E, nuôi dưỡng da suốt đêm để bạn thức dậy với làn da căng mọng.',
    price: '550.000₫',
    tags: ['Mặt nạ ngủ', 'Squalane', 'Cấp ẩm'],
    featured: false,
  },
];

export const featuredProducts = products.filter((p) => p.featured);
