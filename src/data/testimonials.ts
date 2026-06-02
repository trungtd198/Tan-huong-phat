import type { Testimonial } from '@/types';

export const testimonials: Testimonial[] = [
  {
    id: 'review-1',
    name: 'Chị Minh Anh',
    avatar: 'MA',
    avatarBg: 'bg-brand-500',
    location: 'Quận 1, TP.HCM',
    rating: 5,
    text: 'Mình dùng serum Vitamin C được 3 tuần, da sáng hơn hẳn và vết thâm mờ đi rõ rệt. Kết cấu mỏng nhẹ, thấm nhanh, không gây bết dính. Sẽ mua thêm kem dưỡng ẩm nữa!',
    product: 'Serum Vitamin C dưỡng sáng',
  },
  {
    id: 'review-2',
    name: 'Anh Hoàng Nam',
    avatar: 'HN',
    avatarBg: 'bg-gold-500',
    location: 'Quận 7, TP.HCM',
    rating: 5,
    text: 'Lần đầu mua mỹ phẩm online nhưng rất hài lòng. Sản phẩm chính hãng, đóng gói cẩn thận. Kem chống nắng mỏng nhẹ, không bóng dầu, phù hợp da nam giới.',
    product: 'Kem Chống Nắng SPF50+',
  },
  {
    id: 'review-3',
    name: 'Chị Thu Hà',
    avatar: 'TH',
    avatarBg: 'bg-brand-400',
    location: 'Quận Bình Thạnh, TP.HCM',
    rating: 5,
    text: 'Da mình nhạy cảm nên rất kỹ khi chọn sản phẩm. Sữa rửa mặt của Tân Hương Phát dịu nhẹ thật sự, không gây khô hay kích ứng. Dùng 2 tháng rồi, da ổn định hơn nhiều.',
    product: 'Sữa Rửa Mặt Dịu Nhẹ',
  },
];

export const socialProofStats = [
  { value: '10.000+', label: 'Khách hàng tin dùng' },
  { value: '4.9/5', label: 'Đánh giá trung bình' },
  { value: '98%', label: 'Hài lòng sản phẩm' },
  { value: '500+', label: 'Đánh giá 5 sao' },
];
