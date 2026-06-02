import type { Feature } from '@/types';

export const defaultCtaBenefits = [
  'Chính hãng 100%',
  'Giao hàng toàn quốc',
  'Đổi trả trong 30 ngày',
  'Tư vấn cá nhân hóa',
];

export const defaultBrandStoryMetrics = [
  { value: '10 năm+', label: 'Đồng hành cùng khách hàng làm đẹp' },
  { value: '10.000+', label: 'Khách hàng tin dùng' },
  { value: '98%', label: 'Tỷ lệ quay lại mua hàng' },
];

export const defaultFeatureGridItems: Feature[] = [
  {
    icon: '01',
    title: 'Thành phần chọn lọc',
    description:
      'Công thức ưu tiên thành phần sạch, dễ sử dụng hằng ngày và phù hợp với làn da thành thị.',
    tags: ['Thảo mộc', 'Công thức sạch'],
  },
  {
    icon: '02',
    title: 'Trải nghiệm cao cấp',
    description:
      'Kết cấu, mùi hương và bao bì được tinh chỉnh để tạo cảm giác chăm sóc như spa tại nhà.',
    tags: ['Kết cấu cao cấp', 'Bao bì thanh lịch'],
  },
  {
    icon: '03',
    title: 'Tư vấn dùng sản phẩm',
    description:
      'Định hướng quy trình gọn gàng, dễ áp dụng và phù hợp tình trạng da của từng khách hàng.',
    tags: ['Hỗ trợ quy trình', 'Ưu tiên làn da'],
  },
];
