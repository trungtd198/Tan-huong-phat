import type { LucideIcon } from 'lucide-react';
import {
  Building,
  DollarSign,
  Eye,
  Heart,
  Leaf,
  ShieldCheck,
  Sparkles,
  Target,
  User,
} from 'lucide-react';

import { siteConfig } from '@/config/site';

export type IconFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type ProductLine = {
  name: string;
  description: string;
  image: string;
  benefits: string[];
};

export type ProductItem = {
  name: string;
  size: string;
  image: string;
  images?: string[];
  benefits: string[];
  ingredients: string;
  featured?: boolean;
  /** When true, this product's cover image is a marketing infographic — rendered as a full-width banner, not a grid card */
  isBannerCard?: boolean;
};

export type ProductGroup = ProductLine & {
  products: ProductItem[];
};

export const brandFeatures: IconFeature[] = [
  {
    icon: Leaf,
    title: 'Thành phần thiên nhiên',
    description:
      'Được chọn lọc từ thảo mộc và các chiết xuất có nguồn gốc đáng tin cậy.',
  },
  {
    icon: Sparkles,
    title: 'Chất lượng cao cấp',
    description:
      'Công thức được kiểm nghiệm kỹ lưỡng, hướng đến hiệu quả ổn định.',
  },
  {
    icon: Heart,
    title: 'Chăm sóc dịu nhẹ',
    description:
      'Giải pháp chăm sóc tóc hằng ngày cân bằng, phù hợp nhiều thói quen sử dụng.',
  },
];

const contiienaLine: ProductLine = {
  name: 'Contiiena',
  description:
    'Hệ chăm sóc tóc salon kết hợp thảo mộc, Biotin và Collagen cho mái tóc sạch khỏe, mềm mượt.',
  image:
    '/images/products/contiiena/gleditsia-fallopia-multiflora-set/z7761719777177_22bcf3b248b35642d39f21ba1846ffd6.jpg',
  benefits: [
    'Làm sạch và cân bằng da đầu',
    'Phục hồi tóc khô xơ, hư tổn',
    'Dưỡng tóc mềm mượt theo chuẩn salon',
  ],
};

const acaiBeautyLine: ProductLine = {
  name: 'Acai Beauty',
  description: 'Công thức giàu chất chống oxy hóa cho mái tóc khỏe và rạng rỡ.',
  image:
    '/images/products/acai-berry/collagen-spa-hair-treatment/z7761622205688_34298d40a95a21d4a4c730ff116dfc71.jpg',
  benefits: [
    'Giàu chất chống oxy hóa',
    'Tăng độ bóng tự nhiên',
    'Bảo vệ tóc trước tác động hằng ngày',
  ],
};

const caluoberLine: ProductLine = {
  name: 'Caluo.ber',
  description: 'Liệu trình dưỡng sâu cho mái tóc mềm mượt và chắc khỏe.',
  image:
    '/images/products/caluober/hair-repair-essence-lotion/z7761719759589_3ea56d58256da88900e98137f66f82e3.jpg',
  benefits: ['Dưỡng ẩm sâu', 'Phục hồi tóc hư tổn', 'Tạo cảm giác suôn mượt'],
};

export const productLines: ProductLine[] = [
  contiienaLine,
  acaiBeautyLine,
  caluoberLine,
];

export const productGroups: ProductGroup[] = [
  {
    ...contiienaLine,
    products: [
      {
        name: 'Contiiena Gleditsia & Fallopia Multiflora Shampoo',
        size: '500ml - 800ml',
        image:
          '/images/products/contiiena/gleditsia-fallopia-multiflora-set/z7761768214973_ff8672e41beb5ae8c3c33538739a0a41.jpg',
        images: [
          '/images/products/contiiena/gleditsia-fallopia-multiflora-set/z7761768214973_ff8672e41beb5ae8c3c33538739a0a41.jpg',
        ],
        benefits: [
          'Làm sạch da đầu, hỗ trợ giảm dầu thừa và cảm giác bết tóc',
          'Chiết xuất thảo mộc giúp tóc sạch nhẹ và thoáng da đầu',
          'Phù hợp chăm sóc tóc hằng ngày với hương thảo mộc dịu nhẹ',
        ],
        ingredients:
          'Gleditsia, Fallopia Multiflora, chiết xuất thảo mộc dưỡng tóc',
        featured: true,
      },
      {
        name: 'Contiiena Gleditsia & Fallopia Multiflora Conditioner',
        size: '500ml - 800ml',
        image:
          '/images/products/contiiena/gleditsia-fallopia-multiflora-set/z7761768220255_ca761361378e43050c814f3fb8911fe0.jpg',
        images: [
          '/images/products/contiiena/gleditsia-fallopia-multiflora-set/z7761768220255_ca761361378e43050c814f3fb8911fe0.jpg',
          '/images/products/contiiena/gleditsia-fallopia-multiflora-set/z7761768387976_d562f79b46e0011cf02d8e1a3d76d1c8.jpg',
        ],
        benefits: [
          'Làm mềm thân tóc sau bước gội',
          'Giúp tóc dễ chải, giảm xơ rối và khô ráp',
          'Duy trì độ mượt tự nhiên cho tóc thường xuyên tạo kiểu',
        ],
        ingredients:
          'Gleditsia, Fallopia Multiflora, dưỡng chất làm mềm bề mặt tóc',
      },
      {
        name: 'Contiiena Nourishing Repairing Hair Mask',
        size: '200ml',
        image:
          '/images/products/contiiena/nourishing-repairing-hair-mask/z7761768262096_fd8033670bf9270f0d769fbbae3e792f.jpg',
        images: [
          '/images/products/contiiena/nourishing-repairing-hair-mask/z7761768262096_fd8033670bf9270f0d769fbbae3e792f.jpg',
          '/images/products/contiiena/nourishing-repairing-hair-mask/z7761768255780_05564ac8e739c34c76211ce1003f2a08.jpg',
          '/images/products/contiiena/nourishing-repairing-hair-mask/z7761768322328_8d98ce45f44030168112bb1affa9d737.jpg',
          '/images/products/contiiena/nourishing-repairing-hair-mask/z7761768304737_9cbaa6586b7461e6f501c8050ab2cd34.jpg',
          '/images/products/contiiena/nourishing-repairing-hair-mask/z7761768210932_06e78051c427285259f298c3a1409aba.jpg',
        ],
        benefits: [
          'Ủ phục hồi cho tóc khô, xơ rối hoặc hư tổn sau hóa chất',
          'Bổ sung độ ẩm giúp tóc mềm, bóng và vào nếp tốt hơn',
          'Dùng sau bước gội để tăng hiệu quả chăm sóc chuyên sâu',
        ],
        ingredients:
          'Phức hợp dưỡng ẩm, chiết xuất thực vật, hoạt chất phục hồi thân tóc',
      },
      {
        name: 'Contiiena Oil Control Anti-Dandruff Shampoo',
        size: '800ml',
        image:
          '/images/products/contiiena/gleditsia-fallopia-multiflora-set/z7761768239482_17714a891904817918cc4d70658d81f5.jpg',
        images: [
          '/images/products/contiiena/gleditsia-fallopia-multiflora-set/z7761768239482_17714a891904817918cc4d70658d81f5.jpg',
          '/images/products/contiiena/gleditsia-fallopia-multiflora-set/z7761768267669_6c537cd0afd3641b2b8e160a5100b660.jpg',
          '/images/products/contiiena/biotin-collagen-nourishing-repairing-conditioner/z7761768346920_cc989f56bf4252694f1f66683e688fb2.jpg',
        ],
        benefits: [
          'Dầu gội hỗ trợ kiểm soát dầu, giảm gàu và làm sạch da đầu',
          'Giúp chân tóc thông thoáng, hạn chế cảm giác ngứa và bết dính',
          'Biotin và Collagen hỗ trợ cảm giác tóc chắc khỏe hơn',
        ],
        ingredients:
          'Biotin, Collagen, chiết xuất thực vật, thành phần làm sạch dịu nhẹ',
      },
      {
        name: 'Contiiena Nourishing Repairing Conditioner',
        size: '800ml',
        image:
          '/images/products/contiiena/biotin-collagen-nourishing-repairing-conditioner/z7761768233762_5b08d056e2501d56e96b72e433e9111e.jpg',
        images: [
          '/images/products/contiiena/biotin-collagen-nourishing-repairing-conditioner/z7761768233762_5b08d056e2501d56e96b72e433e9111e.jpg',
          '/images/products/contiiena/biotin-collagen-nourishing-repairing-conditioner/z7761768334639_c837c314d51a70101d0b79af2c8f5007.jpg',
          '/images/products/contiiena/biotin-collagen-nourishing-repairing-conditioner/z7761768369816_453cf78c2a3eea8427cc67c657fa963c.jpg',
          '/images/products/contiiena/biotin-collagen-nourishing-repairing-conditioner/z7761768379556_3062436f430ae6918e961aab77cd151c.jpg',
        ],
        benefits: [
          'Nuôi dưỡng tóc khô xơ, hư tổn và khó chải',
          'Làm mềm tóc sau khi gội, hỗ trợ giảm xơ rối',
          'Biotin và Collagen giúp tóc có cảm giác mượt, chắc và bồng hơn',
        ],
        ingredients:
          'Biotin, Collagen, chiết xuất thực vật, hoạt chất dưỡng mềm tóc',
      },
      {
        name: 'Contiiena Salon Shampoo',
        size: '4000ml',
        image:
          '/images/products/contiiena/nourishing-repairing-hair-mask/z7761768310065_224723db59833fc5c44014977901616d.jpg',
        images: [
          '/images/products/contiiena/nourishing-repairing-hair-mask/z7761768310065_224723db59833fc5c44014977901616d.jpg',
          '/images/products/contiiena/nourishing-repairing-hair-mask/z7761768315509_24e6e127b5a4281c2eec2351da60c6c1.jpg',
        ],
        benefits: [
          'Dung tích lớn phù hợp salon hoặc nhu cầu sử dụng chuyên nghiệp',
          'Làm sạch da đầu, hỗ trợ giảm gàu và duy trì tóc sạch nhẹ',
          'Công thức salon phù hợp nhiều loại tóc',
        ],
        ingredients:
          'Công thức salon với thành phần làm sạch và chăm sóc da đầu',
      },
      {
        name: 'Contiiena Salon Conditioner',
        size: '4000ml',
        image:
          '/images/products/contiiena/gleditsia-fallopia-multiflora-set/z7761768244888_90b7ec63f2ac90c5100ee8190798a083.jpg',
        images: [
          '/images/products/contiiena/gleditsia-fallopia-multiflora-set/z7761768244888_90b7ec63f2ac90c5100ee8190798a083.jpg',
        ],
        benefits: [
          'Dung tích lớn phù hợp salon hoặc nhu cầu sử dụng chuyên nghiệp',
          'Dưỡng ẩm, làm mềm và giúp tóc dễ chải hơn',
          'Hỗ trợ phục hồi tóc khô xơ sau hóa chất hoặc tạo kiểu',
        ],
        ingredients:
          'Công thức salon với thành phần dưỡng ẩm và phục hồi thân tóc',
      },
    ],
  },
  {
    ...acaiBeautyLine,
    products: [
      {
        name: 'Acai Berry Plus Collagen Spa Hair Treatment',
        size: '500ml',
        image:
          '/images/products/acai-berry/collagen-spa-hair-treatment/z7761622205688_34298d40a95a21d4a4c730ff116dfc71.jpg',
        images: [
          '/images/products/acai-berry/collagen-spa-hair-treatment/z7761622205688_34298d40a95a21d4a4c730ff116dfc71.jpg',
        ],
        benefits: [
          'Hấp dầu phục hồi chuyên sâu cho tóc yếu, khô xơ',
          'Bổ sung độ ẩm và dưỡng chất giúp tóc mềm mượt',
          'Có thể dùng như kem xả nhanh hoặc hấp dầu chuyên sâu',
        ],
        ingredients:
          'Chiết xuất quả Acai Berry, collagen tự nhiên, dưỡng chất phục hồi tóc',
        featured: true,
      },
      {
        name: 'Acai Berry Plus Essence Styling Hair Gel',
        size: '300ml',
        image:
          '/images/products/acai-berry/essence-styling-hair-gel/z7761622207484_9dba13a28d5b66ad32ef95588f7498db.jpg',
        images: [
          '/images/products/acai-berry/essence-styling-hair-gel/z7761622207484_9dba13a28d5b66ad32ef95588f7498db.jpg',
        ],
        benefits: [
          'Giữ nếp tóc xoăn vào nếp gọn gàng, tự nhiên',
          'Dưỡng chất essence thấm nhanh, không gây bết tóc',
          'Giúp tóc bóng nhẹ và mềm mại hơn sau khi tạo kiểu',
        ],
        ingredients:
          'Acai Berry, hoạt chất giữ nếp, dưỡng chất làm mềm và bảo vệ tóc',
      },
      {
        name: 'Acai Berry Shampoo & Conditioner',
        size: '300ml',
        image:
          '/images/products/acai-berry/shampoo-conditioner/z7761622216555_cd4e95bf60a41ad858ed8eafaec20d69.jpg',
        images: [
          '/images/products/acai-berry/shampoo-conditioner/z7761622216555_cd4e95bf60a41ad858ed8eafaec20d69.jpg',
          '/images/products/acai-berry/shampoo-conditioner/z7761641469670_339dd8894e296680bc9cc78ade655a95.jpg',
          '/images/products/acai-berry/shampoo-conditioner/banner-2.jpg',
          '/images/products/acai-berry/shampoo-conditioner/banner-11.jpg',
          '/images/products/acai-berry/shampoo-conditioner/banner-12.jpg',
        ],
        benefits: [
          'Dầu gội tím hỗ trợ phục hồi tóc khô xơ, uốn nhuộm',
          'Dầu xả xanh làm sạch bã nhờn, giảm bết và làm dịu da đầu',
          'Cấp ẩm, khóa màu tóc nhuộm và tăng độ bồng tự nhiên',
        ],
        ingredients:
          'Acai Berry, phức hợp dưỡng ẩm, thành phần làm sạch dịu nhẹ',
      },
      {
        name: 'Acai Berry Plus Hair Repair Lotion',
        size: '300ml',
        image:
          '/images/products/acai-berry/hair-repair-lotion/z7761719711272_b246882e25d527fd4deedc827b88d8c4.jpg',
        images: [
          '/images/products/acai-berry/hair-repair-lotion/z7761719711272_b246882e25d527fd4deedc827b88d8c4.jpg',
          '/images/products/acai-berry/hair-repair-lotion/banner-10.jpg',
        ],
        benefits: [
          'Dạng xịt phun sương giúp dưỡng chất thấm nhanh vào tóc',
          'Cấp ẩm và làm mềm tóc khô, xơ rối do tạo kiểu hoặc nhiệt',
          'Hỗ trợ giảm tĩnh điện, giúp tóc dễ chải và giảm gãy rụng khi chải',
        ],
        ingredients:
          'Acai Berry, dưỡng chất phục hồi, thành phần cấp ẩm nhẹ cho thân tóc',
      },
      {
        name: 'Acai Berry France Styling',
        size: 'Dưỡng tạo kiểu',
        image:
          '/images/products/acai-berry/france-styling/z7761768392486_26dc6891004b6e46fa2323cedb64329b.jpg',
        images: [
          '/images/products/acai-berry/france-styling/z7761768392486_26dc6891004b6e46fa2323cedb64329b.jpg',
          '/images/products/acai-berry/france-styling/z7761736918616_a4c279eb1854c2d8807f15a3d565a662.jpg',
          '/images/products/acai-berry/france-styling/banner-13.jpg',
        ],
        benefits: [
          'Giữ nếp xoăn suốt ngày dài nhưng vẫn nhẹ tóc',
          'Dưỡng ẩm chuyên sâu, duy trì độ ẩm cần thiết cho tóc',
          'Tăng độ bóng, độ bồng và sức sống cho mái tóc sau tạo kiểu',
        ],
        ingredients:
          'Acai Berry, thành phần dưỡng ẩm, hoạt chất tạo kiểu water-lock',
      },
    ],
  },
  {
    ...caluoberLine,
    products: [
      {
        name: 'Caluo.ber Hair Repair Essence Lotion',
        size: '300ml',
        image:
          '/images/products/caluober/hair-repair-essence-lotion/z7761719759589_3ea56d58256da88900e98137f66f82e3.jpg',
        images: [
          '/images/products/caluober/hair-repair-essence-lotion/z7761719759589_3ea56d58256da88900e98137f66f82e3.jpg',
        ],
        benefits: [
          'Phục hồi tức thì các liên kết tóc bị đứt gãy',
          'Giảm tình trạng tóc mủn, chẻ ngọn và đứt rụng',
          'Chiết xuất dầu Argan giúp tăng độ bóng tự nhiên cho tóc',
        ],
        ingredients: 'Argan Oil, Peanatie Hair Growth, Antidnst Azi Dioge',
        featured: true,
      },
      {
        name: 'Caluo.ber Professional Kerafill Keratin Treatment',
        size: '500ml',
        image:
          '/images/products/caluober/kerafill-keratin-treatment/z7761719764818_2aac2b451f247bb79b7439e4fe9e665b.jpg',
        images: [
          '/images/products/caluober/kerafill-keratin-treatment/z7761719764818_2aac2b451f247bb79b7439e4fe9e665b.jpg',
        ],
        benefits: [
          'Bù đắp Keratin thiếu hụt trên sợi tóc hư tổn',
          'Lấp đầy lỗ hổng biểu bì, giúp tóc dày dặn và chắc khỏe trở lại',
          'Cấp ẩm sâu, duy trì độ mềm mại và bóng mượt cho tóc xơ xác',
        ],
        ingredients:
          'Keratin, hoạt chất phục hồi thân tóc, thành phần dưỡng ẩm chuyên sâu',
      },
      {
        name: 'Caluo.ber Collagen Cool Silky Keratin Hair Repair Treatment',
        size: '800ml',
        image:
          '/images/products/caluober/collagen-cool-silky-keratin-hair-repair-treatment/banner-4.jpg',
        images: [
          '/images/products/caluober/collagen-cool-silky-keratin-hair-repair-treatment/banner-4.jpg',
          '/images/products/caluober/collagen-cool-silky-keratin-hair-repair-treatment/banner-3.jpg',
        ],
        isBannerCard: true,
        benefits: [
          'Tái tạo cấu trúc tóc hư tổn do hóa chất, nhiệt và môi trường',
          'Tăng độ đàn hồi, hạn chế tình trạng đứt gãy và khô xơ',
          'Bao phủ lớp Keratin bóng mượt để bảo vệ bề mặt sợi tóc',
        ],
        ingredients:
          'Keratin, Collagen, grapefruit, apple, aloe extract, vegetable protein',
      },
      {
        name: 'Caluo.ber Herbal Essence Styling Hair Gel',
        size: '300ml',
        image:
          '/images/products/caluober/herbal-essence-styling-hair-gel/banner-6.jpg',
        images: [
          '/images/products/caluober/herbal-essence-styling-hair-gel/banner-6.jpg',
        ],
        benefits: [
          'Giữ nếp tóc xoăn tự nhiên nhưng vẫn mềm nhẹ',
          'Dưỡng tóc với Moroccan Argan Oil và thành phần thuần chay',
          'Hạn chế xù rối, giúp lọn tóc có độ bóng và định hình rõ hơn',
        ],
        ingredients:
          'Moroccan Argan Oil, chiết xuất thảo mộc, thành phần tạo kiểu mềm tóc',
      },
      {
        name: 'Caluo.ber Professional Collagen Hair Repair Essence Lotion',
        size: 'Dưỡng xịt Collagen & Argan',
        image:
          '/images/products/caluober/collagen-hair-repair-essence-lotion/z7761768405430_5e1fa11df9e4082ee72cb6165908bfab.jpg',
        images: [
          '/images/products/caluober/collagen-hair-repair-essence-lotion/z7761768405430_5e1fa11df9e4082ee72cb6165908bfab.jpg',
        ],
        benefits: [
          'Khôi phục sức sống và độ đàn hồi cho tóc yếu',
          'Collagen kết hợp dầu Argan giúp tóc bóng khỏe hơn',
          'Dùng như bước bảo vệ tóc trước sấy hoặc trước khi ra ngoài nắng',
        ],
        ingredients: 'Collagen, tinh dầu Argan, hoạt chất cấp ẩm và bảo vệ tóc',
      },
      {
        name: 'Caluo.ber Anti-Dandruff and Oil Control Shampoo',
        size: '380ml',
        image:
          '/images/products/caluober/beauty-element-anti-dandruff-oil-control-shampoo/z7761768416467_f6034fe4d2ef673cfde8740264277288.jpg',
        images: [
          '/images/products/caluober/beauty-element-anti-dandruff-oil-control-shampoo/z7761768416467_f6034fe4d2ef673cfde8740264277288.jpg',
          '/images/products/caluober/beauty-element-anti-dandruff-oil-control-shampoo/z7761768426801_a94f149be4908c7db664e53e20ffebb1.jpg',
        ],
        benefits: [
          'Làm sạch sâu da đầu, loại bỏ mảng bám gàu',
          'Kiểm soát dầu thừa, giảm tóc bết dính và ngứa ngáy da đầu',
          'Nuôi dưỡng tóc bóng mượt bằng dưỡng chất thực vật tự nhiên',
        ],
        ingredients:
          'Chiết xuất thực vật, hoạt chất làm sạch da đầu, thành phần kiểm soát dầu',
      },
      {
        name: 'Caluo.ber Spa Hair Treatment Collagen',
        size: '280ml / 500ml / 1200ml',
        image:
          '/images/products/caluober/spa-hair-treatment-collagen/z7761768422441_0bda81a8531127fc11d571c73f1ebd41.jpg',
        images: [
          '/images/products/caluober/spa-hair-treatment-collagen/z7761768422441_0bda81a8531127fc11d571c73f1ebd41.jpg',
          '/images/products/caluober/spa-hair-treatment-collagen/banner-7.jpg',
        ],
        benefits: [
          'Cung cấp dinh dưỡng thực vật giúp nuôi dưỡng tóc từ gốc đến ngọn',
          'Collagen cao giúp làm mịn bề mặt tóc thô ráp',
          'Dùng thay dầu xả hằng ngày hoặc làm kem ủ nhanh sau bước gội',
        ],
        ingredients:
          'Collagen, dưỡng chất thực vật, thành phần làm mềm bề mặt tóc',
      },
      {
        name: 'Caluo.ber Hydrogen Peroxide Hair Developer',
        size: '1000ml',
        image:
          '/images/products/caluober/hydrogen-peroxide-hair-developer/banner-8.jpg',
        images: [
          '/images/products/caluober/hydrogen-peroxide-hair-developer/banner-8.jpg',
        ],
        benefits: [
          'Hỗ trợ lên màu tóc ổn định trong quy trình nhuộm',
          'Giảm mùi hắc, hạn chế kích ứng và tạo cảm giác dịu nhẹ hơn cho da đầu',
          'Bổ sung Collagen giúp tóc giữ độ mềm mượt sau nhuộm',
        ],
        ingredients:
          'Hydrogen Peroxide, Collagen, thành phần hỗ trợ nhuộm và chăm sóc tóc',
      },
      {
        name: 'Caluo.ber Collagen Anti-Dandruff Shampoo & LPP Hair Conditioner',
        size: '500ml',
        image:
          '/images/products/caluober/collagen-anti-dandruff-shampoo-conditioner/banner-14.jpg',
        images: [
          '/images/products/caluober/collagen-anti-dandruff-shampoo-conditioner/banner-14.jpg',
          '/images/products/caluober/collagen-anti-dandruff-shampoo-conditioner/banner-9.jpg',
        ],
        benefits: [
          'Dầu gội hỗ trợ làm sạch gàu, giảm ngứa và làm dịu da đầu',
          'Dầu xả LPP giúp phục hồi tóc khô xơ, hư tổn và dễ gãy rụng',
          'Công thức Collagen và Argan giúp tóc mềm, bóng và chắc khỏe hơn',
        ],
        ingredients:
          'Collagen, Argan, thành phần làm sạch da đầu và dưỡng phục hồi tóc',
      },
    ],
  },
];

export const companyInfo = [
  {
    icon: Building,
    label: 'Tên công ty',
    value: 'Công ty Cổ phần Mỹ phẩm Thiên nhiên Tân Hương Phát',
  },
  {
    icon: User,
    label: 'Giám đốc',
    value: 'Giáp Thị Hương',
  },
  {
    icon: DollarSign,
    label: 'Vốn điều lệ',
    value: '3.000.000.000 đồng',
  },
  {
    icon: Building,
    label: 'Địa chỉ',
    value: siteConfig.address,
  },
];

export const visionMission: IconFeature[] = [
  {
    icon: Eye,
    title: 'Tầm nhìn',
    description:
      'Trở thành đơn vị mỹ phẩm thiên nhiên được tin cậy tại Việt Nam, được ghi nhận bởi chất lượng, đổi mới và chăm sóc khách hàng.',
  },
  {
    icon: Target,
    title: 'Sứ mệnh',
    description:
      'Mang đến sản phẩm chăm sóc tóc thiên nhiên chất lượng, giúp tôn vinh vẻ đẹp và sức khỏe thông qua thành phần chọn lọc.',
  },
];

export const commitments: IconFeature[] = [
  {
    icon: Leaf,
    title: 'Thành phần thiên nhiên',
    description:
      'Chúng tôi chọn lọc thảo mộc và chiết xuất từ các nhà cung cấp đáng tin cậy.',
  },
  {
    icon: ShieldCheck,
    title: 'Công thức khoa học',
    description:
      'Sản phẩm kết hợp tri thức truyền thống với tiêu chuẩn chăm sóc mỹ phẩm hiện đại.',
  },
];
