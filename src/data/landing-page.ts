import {
  Clock3,
  Droplets,
  Leaf,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';

import type {
  BrandStoryMetric,
  CTAAction,
  HeroAction,
} from '@/components/sections';
import type { FAQItem, Feature, StatItem } from '@/types';

const heroTrustBadges: StatItem[] = [
  { icon: Sparkles, value: '4.9/5', label: 'Đánh giá từ khách hàng thực tế' },
  { icon: Leaf, value: 'Thảo mộc', label: 'Công thức tinh giản, êm da' },
  { icon: ShieldCheck, value: 'Chính hãng', label: 'Nguồn gốc minh bạch' },
  {
    icon: Droplets,
    value: 'Quy trình',
    label: 'Thiết kế cho nhịp sống hằng ngày',
  },
];

const heroPrimaryAction: HeroAction = {
  label: 'Khám phá bộ sưu tập',
  href: '#products',
  id: 'hero-cta-products',
};

const heroSecondaryAction: HeroAction = {
  label: 'Xem triết lý thương hiệu',
  href: '#about',
  id: 'hero-cta-story',
};

const brandStoryMetrics: BrandStoryMetric[] = [
  { value: '2014', label: 'Khởi đầu với định hướng chăm da tối giản' },
  { value: '12K+', label: 'Khách hàng quay lại vì cảm giác dùng dễ chịu' },
  { value: '96%', label: 'Quy trình được cá nhân hóa sau tư vấn' },
];

const ritualFeatures: Feature[] = [
  {
    icon: Leaf,
    title: 'Công thức ưu tiên sự cân bằng',
    description:
      'Bảng thành phần được chọn lọc theo tiêu chí dịu, ổn định và phù hợp với nhịp chăm da đều đặn mỗi ngày.',
    tags: ['Ưu tiên thảo mộc', 'Dễ dùng hằng ngày'],
  },
  {
    icon: Droplets,
    title: 'Kết cấu chạm vào là muốn dùng tiếp',
    description:
      'Từ sữa rửa mặt đến kem dưỡng, mọi lớp kết cấu đều hướng tới cảm giác mỏng, sạch và thanh lịch trên da.',
    tags: ['Kết cấu tinh tế', 'Không nhờn rít'],
  },
  {
    icon: Clock3,
    title: 'Quy trình rõ ràng, không dư bước',
    description:
      'Chúng tôi thiết kế các gợi ý chăm da ngắn gọn để khách hàng dễ duy trì mà vẫn cảm nhận được sự cải thiện bền vững.',
    tags: ['Tư vấn theo làn da', 'Nghi thức đơn giản'],
  },
];

const faqItems: FAQItem[] = [
  {
    question: 'Tân Hương Phát phù hợp với những ai?',
    answer:
      'Phù hợp với khách hàng tìm kiếm mỹ phẩm chính hãng, bảng thành phần tinh giản và trải nghiệm chăm da cao cấp nhưng dễ dùng hằng ngày.',
  },
  {
    question: 'Nếu chưa biết nên bắt đầu từ sản phẩm nào thì sao?',
    answer:
      'Bạn có thể bắt đầu với bộ ba làm sạch, serum và kem dưỡng. Đội ngũ tư vấn sẽ gợi ý quy trình theo tình trạng da hiện tại để tránh mua dư sản phẩm.',
  },
  {
    question: 'Sản phẩm có phù hợp với khí hậu nóng ẩm không?',
    answer:
      'Có. Danh mục được chọn theo tiêu chí thấm nhanh, không nặng mặt và dễ dùng nhiều lớp trong khí hậu nóng ẩm như Việt Nam.',
  },
  {
    question: 'Tôi có thể nhận hỗ trợ sau khi mua không?',
    answer:
      'Có. Sau khi nhận hàng, bạn vẫn có thể nhắn để được hướng dẫn cách dùng, tần suất sử dụng và điều chỉnh quy trình nếu da thay đổi.',
  },
  {
    question: 'Chính sách giao hàng và đổi trả như thế nào?',
    answer:
      'Chúng tôi giao hàng toàn quốc, miễn phí cho đơn đủ điều kiện và hỗ trợ đổi trả trong 30 ngày nếu sản phẩm không phù hợp.',
  },
  {
    question: 'Thương hiệu có phù hợp để làm quà tặng không?',
    answer:
      'Có. Bao bì theo hướng tối giản, sang trọng và có thể kết hợp thành bộ quà chăm sóc da tinh tế cho các dịp đặc biệt.',
  },
];

const ctaBenefits = [
  'Tư vấn cá nhân hóa',
  'Chăm sóc sau mua',
  'Giao hàng toàn quốc',
];

const ctaPrimaryAction: CTAAction = {
  label: 'Nhận tư vấn riêng',
  href: 'mailto:info@tanhuongphat.vn',
  id: 'cta-email',
};

const ctaSecondaryAction: CTAAction = {
  label: 'Gọi 0901.234.567',
  href: 'tel:0901234567',
  id: 'cta-phone',
};

const productShowcaseContent = {
  badge: 'Bộ sưu tập nổi bật',
  title: 'Những công thức được chọn để dùng lâu dài',
  subtitle:
    'Tập trung vào dưỡng sáng, phục hồi và bảo vệ da với cảm giác sử dụng gọn gàng, thanh lịch và dễ duy trì.',
  highlights: [
    ['01', 'Dưỡng sáng thanh lịch'],
    ['02', 'Phục hồi hàng rào da'],
    ['03', 'Bảo vệ trước môi trường'],
  ] as [string, string][],
};

const testimonialsContent = {
  badge: 'Khách hàng cảm nhận',
  title: 'Sự tinh tế thể hiện rõ nhất sau nhiều tuần sử dụng',
  subtitle:
    'Phản hồi tập trung vào cảm giác da ổn hơn, quy trình dễ theo hơn và trải nghiệm dùng sản phẩm đủ tinh giản để duy trì.',
  stats: [
    { icon: Star, value: '4.9/5', label: 'Điểm hài lòng trung bình' },
    { icon: ShieldCheck, value: '98%', label: 'Khách hàng muốn mua lại' },
    { icon: Sparkles, value: '500+', label: 'Đánh giá 5 sao đã ghi nhận' },
    {
      icon: Droplets,
      value: '30 ngày',
      label: 'Mốc cảm nhận cải thiện phổ biến',
    },
  ] satisfies StatItem[],
};

export const landingPageContent = {
  hero: {
    announcement: 'Mỹ phẩm cao cấp tuyển chọn cho thói quen chăm da hiện đại',
    title: 'Nghi thức chăm da',
    highlightedTitle: 'tối giản nhưng sang trọng',
    description:
      'Tân Hương Phát tuyển chọn mỹ phẩm cao cấp với bảng thành phần tinh gọn, kết cấu thanh lịch và trải nghiệm dùng đủ tinh tế để bạn muốn quay lại mỗi ngày.',
    highlights: [
      'Kết cấu thanh lịch, dễ dùng nhiều lớp',
      'Tư vấn quy trình ngắn gọn, cá nhân hóa',
      'Chính sách hỗ trợ sau mua rõ ràng',
    ],
    primaryAction: heroPrimaryAction,
    secondaryAction: heroSecondaryAction,
    trustBadges: heroTrustBadges,
  },
  brandStory: {
    id: 'about',
    badge: 'Triết lý thương hiệu',
    title: 'Vẻ đẹp hiện đại bắt đầu từ cảm giác làn da được lắng lại',
    subtitle:
      'Chúng tôi theo đuổi cách chăm da chậm rãi, có chọn lọc và đặt sự ổn định lâu dài lên trước những xu hướng ngắn hạn.',
    description:
      'Mỗi lựa chọn tại Tân Hương Phát đều xoay quanh hai điều: sản phẩm phải dễ sống cùng trong thói quen hằng ngày và phải mang lại cảm giác đủ tinh tế để việc chăm da trở thành một khoảng nghỉ đẹp.',
    supportingText:
      'Từ kết cấu, bao bì đến cách tư vấn quy trình, mọi điểm chạm đều được giữ tối giản, ấm áp và có chủ đích để phản ánh tinh thần của một thương hiệu mỹ phẩm cao cấp đương đại.',
    metrics: brandStoryMetrics,
    theme: 'light' as const,
  },
  products: productShowcaseContent,
  features: {
    id: 'ritual',
    badge: 'Tiêu chuẩn tuyển chọn',
    title: 'Ba nguyên tắc định hình mọi bộ sưu tập',
    subtitle:
      'Thay vì mở rộng quá nhiều, chúng tôi ưu tiên những công thức có thể gắn bó lâu dài với làn da và lối sống.',
    features: ritualFeatures,
    theme: 'light' as const,
    columns: 3 as const,
  },
  testimonials: testimonialsContent,
  faq: {
    id: 'faq',
    badge: 'Giải đáp nhanh',
    title: 'Những điều khách hàng thường hỏi trước khi bắt đầu',
    subtitle:
      'Các câu trả lời ngắn gọn để bạn hiểu rõ hơn về định hướng sản phẩm, cách tư vấn và trải nghiệm mua hàng.',
    items: faqItems,
  },
  cta: {
    id: 'cta',
    eyebrow: 'Tư vấn riêng',
    title: 'Bắt đầu một quy trình',
    highlightedTitle: 'đủ đẹp để muốn giữ lâu dài',
    description:
      'Nhận tư vấn về tình trạng da, kết cấu phù hợp và bộ sản phẩm nên bắt đầu mà không cần thử quá nhiều thứ cùng lúc.',
    primaryAction: ctaPrimaryAction,
    secondaryAction: ctaSecondaryAction,
    benefits: ctaBenefits,
  },
};
