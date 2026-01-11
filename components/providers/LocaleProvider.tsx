'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Locale = 'ar' | 'en';

type I18nDict = Record<string, Record<Locale, string>>;

const dict: I18nDict = {
  'header.features': { ar: 'الميزات', en: 'Features' },
  'header.pricing': { ar: 'الأسعار', en: 'Pricing' },
  'header.support': { ar: 'الدعم', en: 'Support' },
  'header.login': { ar: 'تسجيل الدخول', en: 'Log In' },
  'header.getStarted': { ar: 'ابدأ الآن', en: 'Get Started' },
  'header.logout': { ar: 'تسجيل الخروج', en: 'Log Out' },
  'login.title': { ar: 'تسجيل الدخول', en: 'Log In' },
  'login.email': { ar: 'البريد الإلكتروني', en: 'Email' },
  'login.password': { ar: 'كلمة المرور', en: 'Password' },
  'login.submit': { ar: 'تسجيل الدخول', en: 'Log In' },
  'login.error': { ar: 'بيانات الدخول غير صحيحة', en: 'Invalid credentials' },
  'login.noAccount': { ar: 'ليس لديك حساب؟', en: 'No account?' },
  'login.goRegister': { ar: 'أنشئ حسابًا', en: 'Create an account' },
  'home.title': { ar: 'مرحبًا بك في إيمايلات', en: 'Welcome to Emailat' },
  'home.subtitle': {
    ar: 'ابدأ باختيار الباقة لإعداد بريد إلكتروني احترافي لعملك.',
    en: 'Start by choosing your plan to set up professional email for your business.',
  },
  'home.goDashboard': { ar: 'اذهب إلى لوحة التحكم', en: 'Go to Dashboard' },
  'common.termsAgreed': { ar: 'بالمتابعة، أنت توافق على شروط الخدمة.', en: 'By continuing, you agree to our Terms of Service.' },
  'order.totalDueToday': { ar: 'الإجمالي المستحق اليوم', en: 'Total due today' },
  'common.users': { ar: 'مستخدمون', en: 'Users' },
  'common.storage': { ar: 'مساحة تخزين', en: 'Storage' },
  'common.edit': { ar: 'تعديل', en: 'Edit' },
  'common.save': { ar: 'حفظ', en: 'Save' },
  'common.cancel': { ar: 'إلغاء', en: 'Cancel' },
  'footer.copy': { ar: '© 2026 إيمايلات. جميع الحقوق محفوظة.', en: '© 2026 Emailat. All rights reserved.' },
  'footer.company': { ar: 'الشركة', en: 'Company' },
  'footer.services': { ar: 'الخدمات', en: 'Services' },
  'footer.policies': { ar: 'السياسات', en: 'Policies' },
  'footer.link.about': { ar: 'من نحن', en: 'About' },
  'footer.link.services': { ar: 'الخدمات', en: 'Services' },
  'footer.link.terms': { ar: 'الشروط', en: 'Terms' },
  'footer.link.policies': { ar: 'السياسات', en: 'Policies' },
  'about.title': { ar: 'من نحن', en: 'About Us' },
  'about.subtitle': {
    ar: 'نقدّم استضافة بريد احترافية آمنة وموثوقة لتمكين الأعمال.',
    en: 'We provide secure, reliable professional email hosting to empower businesses.',
  },
  'about.missionTitle': { ar: 'مهمتنا', en: 'Our Mission' },
  'about.missionText': {
    ar: 'تمكين الشركات من التواصل الاحترافي عبر بريد آمن وسهل الإدارة مع دعم مميز وتجربة سلسة.',
    en: 'Empower companies with secure, easily managed professional email, premium support, and a seamless experience.',
  },
  'about.valuesTitle': { ar: 'قيمنا', en: 'Our Values' },
  'about.values.1': { ar: 'التركيز على العميل أولًا', en: 'Customer-first focus' },
  'about.values.2': { ar: 'الاعتمادية والأمان', en: 'Reliability and security' },
  'about.values.3': { ar: 'الشفافية والابتكار', en: 'Transparency and innovation' },
  'terms.title': { ar: 'شروط الخدمة', en: 'Terms of Service' },
  'terms.lastUpdated': { ar: 'آخر تحديث: يناير 2026', en: 'Last updated: Jan 2026' },
  'terms.intro': {
    ar: 'باستخدامك لخدماتنا، فإنك توافق على هذه الشروط. يرجى قراءتها بعناية.',
    en: 'By using our services, you agree to these terms. Please read them carefully.',
  },
  'terms.acceptanceTitle': { ar: 'الموافقة على الشروط', en: 'Acceptance of Terms' },
  'terms.acceptanceText': {
    ar: 'استخدامك للموقع أو الخدمات يشكّل موافقة ضمنية على هذه الشروط وسياساتنا المرتبطة.',
    en: 'Your use of the website or services constitutes implicit acceptance of these terms and our related policies.',
  },
  'terms.billingTitle': { ar: 'الفوترة والمدفوعات', en: 'Billing & Payments' },
  'terms.billingText': {
    ar: 'تُحتسب الرسوم حسب الباقة المختارة وفترة الفوترة. قد تُطبّق ضرائب ورسوم إضافية بحسب المنطقة.',
    en: 'Charges are based on the selected plan and billing period. Taxes and additional fees may apply depending on region.',
  },
  'terms.privacyTitle': { ar: 'الخصوصية', en: 'Privacy' },
  'terms.privacyText': {
    ar: 'نلتزم بحماية بياناتك وفق سياسة الخصوصية الخاصة بنا. راجع سياسة الخصوصية للمزيد من التفاصيل.',
    en: 'We protect your data according to our privacy policy. Please review the privacy policy for more details.',
  },
  'services.title': { ar: 'خدماتنا', en: 'Our Services' },
  'services.subtitle': {
    ar: 'حلول متكاملة للبريد والنطاق والدعم والأمان.',
    en: 'Integrated solutions for email, domains, support, and security.',
  },
  'services.emailHosting': { ar: 'استضافة البريد الاحترافي', en: 'Professional Email Hosting' },
  'services.emailHostingDesc': {
    ar: 'حسابات بريد سريعة وآمنة مع حماية ضد الرسائل المزعجة وسهولة الإدارة.',
    en: 'Fast, secure mailboxes with spam protection and easy administration.',
  },
  'services.domainManagement': { ar: 'إدارة النطاقات', en: 'Domain Management' },
  'services.domainManagementDesc': {
    ar: 'تسجيل ونقل وإعداد DNS بسهولة مع دعم فني على مدار الساعة.',
    en: 'Domain registration, transfer, and DNS setup made simple with 24/7 support.',
  },
  'services.support24': { ar: 'دعم 24/7', en: '24/7 Support' },
  'services.support24Desc': {
    ar: 'فريق دعم متواجد دائمًا لمساعدتك عبر التذاكر والدردشة المباشرة.',
    en: 'A support team always available to help via tickets and live chat.',
  },
  'services.security': { ar: 'أمان متقدم', en: 'Advanced Security' },
  'services.securityDesc': {
    ar: 'حماية بياناتك عبر التشفير والنسخ الاحتياطي والمراقبة الاستباقية.',
    en: 'Protect your data through encryption, backups, and proactive monitoring.',
  },
  'policies.title': { ar: 'السياسات', en: 'Policies' },
  'policies.subtitle': {
    ar: 'تعرف على سياسات الخصوصية وملفات تعريف الارتباط والاحتفاظ بالبيانات.',
    en: 'Learn about our Privacy, Cookies, and Data Retention policies.',
  },
  'policies.privacyTitle': { ar: 'سياسة الخصوصية', en: 'Privacy Policy' },
  'policies.privacyText': {
    ar: 'نستخدم بياناتك لتقديم الخدمة وتحسين التجربة وفق معايير صارمة لحماية الخصوصية.',
    en: 'We use your data to deliver the service and improve the experience under strict privacy standards.',
  },
  'policies.cookiesTitle': { ar: 'سياسة الكوكيز', en: 'Cookies Policy' },
  'policies.cookiesText': {
    ar: 'تساعدنا الكوكيز على تذكر تفضيلاتك وتحسين الأداء. يمكنك ضبط الإعدادات من المتصفح.',
    en: 'Cookies help us remember your preferences and improve performance. You can adjust settings from your browser.',
  },
  'policies.retentionTitle': { ar: 'الاحتفاظ بالبيانات', en: 'Data Retention' },
  'policies.retentionText': {
    ar: 'نحتفظ بالبيانات لمدة لازمة قانونيًا وتشغيليًا، ثم نقوم بحذفها بشكل آمن.',
    en: 'We retain data for legally and operationally necessary periods, then securely delete it.',
  },
  'plans.title': { ar: 'استضافة بريد إلكتروني احترافية للأعمال النامية', en: 'Professional Email Hosting for Growing Businesses' },
  'plans.subtitle': {
    ar: 'حلول بريد إلكتروني آمنة وموثوقة وقابلة للتوسّع مصممة خصيصًا لاحتياجات شركتك. اختر الباقة الأنسب لنموّك.',
    en: "Secure, reliable, and scalable email solutions designed specifically for your company's needs. Choose the plan that fits your growth.",
  },
  'plans.toggle.monthly': { ar: 'شهري', en: 'Monthly' },
  'plans.toggle.yearly': { ar: 'سنوي', en: 'Yearly' },
  'plans.toggle.save20': { ar: 'وفّر 20%', en: 'Save 20%' },
  'plans.popular': { ar: 'الأكثر شيوعًا', en: 'Most Popular' },
  'plans.contactSales': { ar: 'تواصل مع المبيعات', en: 'Contact Sales' },
  'plans.selectPlan': { ar: 'اختر الباقة', en: 'Select Plan' },
  'plans.perMonth': { ar: '/ شهر', en: '/ month' },
  'plans.perYear': { ar: '/ سنة', en: '/ year' },
  'plans.compare.title': { ar: 'قارن المميزات بين الباقات', en: 'Compare plan features' },
  'plans.compare.subtitle': {
    ar: 'اختَر بثقة عبر مقارنة سريعة لأهم المميزات.',
    en: 'Choose with confidence by quickly comparing key features.',
  },
  'plans.compare.feature': { ar: 'الميزة', en: 'Feature' },
  'plans.compare.emailAccounts': { ar: 'حسابات البريد', en: 'Email Accounts' },
  'plans.compare.storage': { ar: 'سعة التخزين', en: 'Storage' },
  'plans.compare.support': { ar: 'الدعم', en: 'Support' },
  'plans.compare.freeDomain': { ar: 'نطاق مجاني (سنة)', en: 'Free Domain (1 year)' },
  'plans.compare.backups': { ar: 'نسخ احتياطي يومي', en: 'Daily Backups' },
  'plans.compare.security': { ar: 'أمان متقدم', en: 'Advanced Security' },
  'plans.compare.uptime': { ar: 'ضمان التوافر', en: 'Uptime Guarantee' },
  'plans.compare.included': { ar: 'مشمول', en: 'Included' },
  'plans.compare.notIncluded': { ar: 'غير مشمول', en: 'Not included' },
  'plans.compare.unlimited': { ar: 'غير محدود', en: 'Unlimited' },
  'plans.compare.support.basic': { ar: 'أساسي', en: 'Basic' },
  'plans.compare.support.priority': { ar: 'أولوية', en: 'Priority' },
  'plans.compare.support.dedicated': { ar: 'مدير حساب مخصّص', en: 'Dedicated Account Manager' },
  'plans.faq.title': { ar: 'الأسئلة الشائعة حول الباقات', en: 'Plan FAQs' },
  'plans.faq.q1': { ar: 'هل يمكنني الترقية أو التخفيض لاحقًا؟', en: 'Can I upgrade or downgrade later?' },
  'plans.faq.a1': {
    ar: 'نعم، يمكنك تغيير الباقة في أي وقت وسيتم تعديل الفوترة تلقائيًا وفقًا للباقـة الجديدة.',
    en: 'Yes, you can change plans anytime and billing will adjust automatically based on the new plan.',
  },
  'plans.faq.q2': { ar: 'هل توجد فترة تجريبية؟', en: 'Is there a trial period?' },
  'plans.faq.a2': {
    ar: 'نقدّم ضمان استرداد لمدة 14 يومًا. إن لم تكن راضيًا، يمكنك الإلغاء بسهولة.',
    en: 'We offer a 14-day money-back guarantee. If you’re not satisfied, you can cancel easily.',
  },
  'plans.faq.q3': { ar: 'كيف يتم احتساب التخفيض السنوي؟', en: 'How is the yearly discount applied?' },
  'plans.faq.a3': {
    ar: 'الفوترة السنوية تمنحك خصم 20% مقارنةً بالشهرية، ويظهر السعر الشهري بعد الخصم للوضوح.',
    en: 'Yearly billing gives you 20% off compared to monthly, and we show the discounted monthly equivalent for clarity.',
  },
  'plans.faq.q4': { ar: 'هل يمكن إضافة نطاق لاحقًا؟', en: 'Can I add a domain later?' },
  'plans.faq.a4': {
    ar: 'نعم، يمكنك إضافة نطاق جديد أو ربط نطاق موجود من لوحة التحكم في أي وقت.',
    en: 'Yes, you can add a new domain or connect an existing one from the dashboard anytime.',
  },
  'plans.faq.q5': { ar: 'ماذا عن الأمان والنسخ الاحتياطي؟', en: 'What about security and backups?' },
  'plans.faq.a5': {
    ar: 'تشمل الباقات المتقدمة ميزات أمان متقدمة ونسخًا احتياطيًا يوميًا لضمان سلامة بياناتك.',
    en: 'Advanced plans include enhanced security and daily backups to keep your data safe.',
  },
  'billing.title': { ar: 'عنوان الفوترة', en: 'Billing address' },
  'billing.firstName': { ar: 'الاسم الأول', en: 'First name' },
  'billing.lastName': { ar: 'اسم العائلة', en: 'Last name' },
  'billing.country': { ar: 'دولة الإقامة', en: 'Country of residence' },
  'billing.phone': { ar: 'رقم الهاتف', en: 'Phone number' },
  'billing.address': { ar: 'العنوان', en: 'Address' },
  'billing.city': { ar: 'المدينة', en: 'City' },
  'billing.zip': { ar: 'الرمز البريدي', en: 'ZIP code' },
  'billing.continue': { ar: 'استمرار', en: 'Continue' },
  'payment.title': { ar: 'الدفع', en: 'Payment' },
  'payment.reviewPay': { ar: 'مراجعة والدفع', en: 'Review & Pay' },
  'payment.method': { ar: 'طريقة الدفع', en: 'Payment Method' },
  'payment.methodHint': {
    ar: 'اختر طريقة الدفع المناسبة لاشتراكك.',
    en: 'Select how you would like to pay for your subscription.',
  },
  'payment.card': { ar: 'بطاقة', en: 'Card' },
  'payment.cardHint': { ar: 'Visa، Mastercard', en: 'Visa, Mastercard' },
  'payment.paypal': { ar: 'باي بال', en: 'PayPal' },
  'payment.paypalHint': { ar: 'دفع سريع', en: 'Fast checkout' },
  'payment.bank': { ar: 'تحويل بنكي', en: 'Bank Transfer' },
  'payment.bankHint': { ar: 'فاتورة مباشرة', en: 'Direct Invoice' },
  'payment.cardDetails': { ar: 'بيانات البطاقة', en: 'Card Details' },
  'payment.cardNumber': { ar: 'رقم البطاقة', en: 'Card Number' },
  'payment.expiry': { ar: 'تاريخ الانتهاء', en: 'Expiration Date' },
  'payment.cvv': { ar: 'CVC / CVV', en: 'CVC / CVV' },
  'payment.cardholderName': { ar: 'اسم حامل البطاقة', en: 'Cardholder Name' },
  'payment.completePayment': { ar: 'أكمل الدفع', en: 'Complete Payment' },
  'payment.redirectPaypal': { ar: 'سيتم تحويلك إلى باي بال لإكمال الدفع.', en: 'You will be redirected to PayPal to complete your payment.' },
  'payment.requestInvoice': { ar: 'طلب فاتورة', en: 'Request Invoice' },
  'payment.bankInfo': { ar: 'ستصلك فاتورة عبر البريد بتفاصيل التحويل البنكي.', en: 'You will receive an invoice via email with bank transfer details.' },
  'order.summary': { ar: 'ملخص الطلب', en: 'Order summary' },
  'order.itemsLabel': { ar: 'عناصر', en: 'items' },
  'order.taxes': {
    ar: 'سيتم احتساب الضرائب بعد تقديم عنوان الفوترة',
    en: 'Calculated after you provide your billing address',
  },
  'order.subtotal': { ar: 'المجموع الفرعي', en: 'Subtotal' },
  'order.billingPeriod': { ar: 'فترة الفوترة', en: 'Billing period' },
  'order.discountApplied': { ar: 'خصم 20% سنوي', en: '20% yearly discount' },
  'domain.step.plan': { ar: 'الباقة', en: 'Plan' },
  'domain.step.domain': { ar: 'النطاق', en: 'Domain' },
  'domain.step.billing': { ar: 'الفوترة', en: 'Billing' },
  'domain.step.payment': { ar: 'الدفع', en: 'Payment' },
  'domain.step.registration': { ar: 'التسجيل', en: 'Registration' },
  'domain.chooseTitle': { ar: 'اختر اسم النطاق', en: 'Choose your domain name' },
  'domain.chooseSubtitle': {
    ar: 'سجّل نطاقًا جديدًا أو استخدم نطاقًا تملكه للبدء في بريدك الاحترافي.',
    en: 'Register a new domain or use one you already own to get started with your professional email.',
  },
  'domain.tab.new': { ar: 'تسجيل نطاق جديد', en: 'Register New Domain' },
  'domain.tab.existing': { ar: 'لدي نطاق بالفعل', en: 'I have a domain name' },
  'domain.nameLabel': { ar: 'اسم النطاق', en: 'Domain Name' },
  'domain.extensionLabel': { ar: 'الامتداد', en: 'Extension' },
  'domain.check': { ar: 'تحقق', en: 'Check' },
  'domain.availableSuffix': { ar: 'متاح!', en: 'is available!' },
  'domain.greatChoice': { ar: 'اختيار رائع لعملك.', en: 'Great choice for your business.' },
  'domain.select': { ar: 'اختر', en: 'Select' },
  'domain.secureTransfer': { ar: 'نقل آمن', en: 'Secure Transfer' },
  'domain.encryption': { ar: 'تشفير 256-بت', en: '256-bit encryption' },
  'domain.support24': { ar: 'دعم 24/7', en: '24/7 Support' },
  'domain.liveChat': { ar: 'الدردشة المباشرة متاحة', en: 'Live chat available' },
  'domain.autoConfig': { ar: 'إعداد تلقائي', en: 'Auto-Config' },
  'domain.dnsIncluded': { ar: 'يشمل إعداد DNS', en: 'DNS setup included' },
  'domain.registrationOneYear': { ar: 'تسجيل سنة واحدة', en: '1 Year Registration' },
  'domain.continueBilling': { ar: 'متابعة إلى الفوترة', en: 'Continue to Billing' },
  'domain.planSettings': { ar: 'إعدادات الخطة', en: 'Plan Settings' },
  'domain.accountConfiguration': { ar: 'تهيئة الحسابات', en: 'Account Configuration' },
  'domain.numberOfAccounts': { ar: 'عدد الحسابات', en: 'Number of Accounts' },
  'domain.storageAllocation': { ar: 'توزيع التخزين', en: 'Storage Allocation' },
  'domain.defaultIncluded': { ar: 'افتراضي (مشمول)', en: 'Default (Included)' },
  'domain.accountsRequested': { ar: 'عدد الحسابات المطلوبة', en: 'Requested accounts' },
  'domain.storagePerAccount': { ar: 'مساحة لكل حساب', en: 'Storage per account' },
  'domain.perAccountSuffix': { ar: 'لكل حساب', en: 'per account' },
  'dashboard.title': { ar: 'لوحة التحكم', en: 'Dashboard' },
  'dashboard.searchPlaceholder': {
    ar: 'ابحث عن النطاقات أو الحسابات...',
    en: 'Search domains or accounts...',
  },
  'dashboard.welcome': { ar: 'مرحبًا بعودتك،', en: 'Welcome back,' },
  'dashboard.domains': { ar: 'النطاقات', en: 'Domains' },
  'dashboard.emails': { ar: 'البريد', en: 'Emails' },
  'dashboard.billing': { ar: 'الفواتير', en: 'Billing' },
  'dashboard.support': { ar: 'الدعم', en: 'Support' },
  'dashboard.actions': { ar: 'إجراءات', en: 'Actions' },
  'dashboard.status.active': { ar: 'نشط', en: 'Active' },
  'dashboard.status.expiring': { ar: 'ينتهي قريبًا', en: 'Expiring soon' },
  'dashboard.status.pending': { ar: 'معلّق', en: 'Pending' },
  'dashboard.domainsList': { ar: 'قائمة النطاقات', en: 'Domains List' },
  'dashboard.addDomain': { ar: 'إضافة نطاق جديد', en: 'Add New Domain' },
  'dashboard.connectDomain': { ar: 'ربط نطاق موجود', en: 'Connect Existing Domain' },
  'dashboard.manageDNS': { ar: 'إدارة DNS', en: 'Manage DNS' },
  'dashboard.renew': { ar: 'تجديد', en: 'Renew' },
  'dashboard.mailboxes': { ar: 'صناديق البريد', en: 'Mailboxes' },
  'dashboard.mailbox': { ar: 'صندوق بريد', en: 'Mailbox' },
  'dashboard.storage': { ar: 'التخزين', en: 'Storage' },
  'dashboard.addMailbox': { ar: 'إضافة صندوق بريد', en: 'Add Mailbox' },
  'dashboard.enable': { ar: 'تفعيل', en: 'Enable' },
  'dashboard.disable': { ar: 'تعطيل', en: 'Disable' },
  'dashboard.newSubscription': { ar: 'اشتراك جديد', en: 'New Subscription' },
  'dashboard.recentActivity': { ar: 'النشاط الأخير', en: 'Recent Activity' },
  'dashboard.columns.date': { ar: 'التاريخ', en: 'Date' },
  'dashboard.columns.activityType': { ar: 'نوع النشاط', en: 'Activity Type' },
  'dashboard.columns.description': { ar: 'الوصف', en: 'Description' },
  'dashboard.columns.status': { ar: 'الحالة', en: 'Status' },
  'billing.subscriptions': { ar: 'الاشتراكات', en: 'Subscriptions' },
  'billing.invoices': { ar: 'الفواتير', en: 'Invoices' },
  'billing.paymentHistory': { ar: 'سجل الدفعات', en: 'Payment History' },
  'billing.paymentMethods': { ar: 'طرق الدفع', en: 'Payment Methods' },
  'billing.addMethod': { ar: 'إضافة طريقة دفع', en: 'Add Method' },
  'billing.addInvoice': { ar: 'إضافة فاتورة', en: 'Add Invoice' },
  'billing.default': { ar: 'افتراضي', en: 'Default' },
  'billing.setDefault': { ar: 'تعيين كافتراضي', en: 'Set Default' },
  'billing.remove': { ar: 'حذف', en: 'Remove' },
  'billing.columns.invoice': { ar: 'فاتورة', en: 'Invoice' },
  'billing.columns.date': { ar: 'التاريخ', en: 'Date' },
  'billing.columns.dueDate': { ar: 'تاريخ الاستحقاق', en: 'Due Date' },
  'billing.columns.amount': { ar: 'المبلغ', en: 'Amount' },
  'billing.columns.status': { ar: 'الحالة', en: 'Status' },
  'billing.columns.actions': { ar: 'إجراءات', en: 'Actions' },
  'billing.status.paid': { ar: 'مدفوعة', en: 'Paid' },
  'billing.status.due': { ar: 'مستحقة', en: 'Due' },
  'billing.status.overdue': { ar: 'متأخرة', en: 'Overdue' },
  'support.openTicket': { ar: 'افتح تذكرة جديدة', en: 'Open New Ticket' },
  'support.recentTickets': { ar: 'التذاكر الأخيرة', en: 'Recent Tickets' },
  'dashboard.stats.activeDomains': { ar: 'نطاقات نشطة', en: 'Active Domains' },
  'dashboard.stats.mailboxesUsed': { ar: 'صناديق البريد المستخدمة', en: 'Mailboxes Used' },
  'dashboard.stats.storageUsage': { ar: 'استخدام التخزين', en: 'Storage Usage' },
  'dashboard.stats.allOperational': { ar: 'جميعها تعمل', en: 'All operational' },
  'dashboard.stats.licensesAvailable': { ar: 'تراخيص متاحة', en: 'licenses available' },
  'dashboard.stats.ofTotal': { ar: 'من إجمالي', en: 'of total' },
  'dashboard.overviewToday': {
    ar: 'هذا ما يحدث لخدمات الاستضافة اليوم.',
    en: "Here's what's happening with your hosting services today.",
  },
  'activity.userManagement': { ar: 'إدارة المستخدمين', en: 'User Management' },
  'activity.billing': { ar: 'الفوترة', en: 'Billing' },
  'activity.domainSettings': { ar: 'إعدادات النطاق', en: 'Domain Settings' },
  'activity.systemAlert': { ar: 'تنبيه النظام', en: 'System Alert' },
  'activity.security': { ar: 'الأمان', en: 'Security' },
  'activity.createdMailboxFor': { ar: 'تم إنشاء صندوق بريد جديد لـ', en: 'Created new mailbox for' },
  'activity.autoPaymentSuccessful': { ar: 'تم الدفع التلقائي بنجاح', en: 'Automatic payment successful' },
  'activity.invoice': { ar: 'فاتورة', en: 'Invoice' },
  'activity.dnsRecordsUpdatedFor': { ar: 'تم تحديث سجلات DNS لـ', en: 'DNS records updated for' },
  'activity.storageUsageFor': { ar: 'استخدام التخزين لـ', en: 'Storage usage for' },
  'activity.reached': { ar: 'وصل إلى', en: 'reached' },
  'activity.passwordResetAdmin': { ar: 'تم بدء إعادة تعيين كلمة المرور لحساب المشرف', en: 'Password reset initiated for admin account' },
  'status.completed': { ar: 'مكتمل', en: 'Completed' },
  'status.pendingPropagation': { ar: 'قيد الانتشار', en: 'Pending Propagation' },
  'status.warning': { ar: 'تحذير', en: 'Warning' },
  'success.paymentSecure': { ar: 'الدفع آمن ومشفّر', en: 'Payment secure & encrypted' },
  'success.downloadInvoice': { ar: 'تحميل الفاتورة', en: 'Download Invoice' },
  'success.goDashboard': { ar: 'اذهب إلى لوحة التحكم', en: 'Go to Dashboard' },
  'success.needHelp': { ar: 'هل تحتاج مساعدة؟ تواصل مع الدعم', en: 'Need help? Contact Support' },
  'success.title': { ar: 'تم تفعيل الاشتراك بنجاح!', en: 'Subscription Activated Successfully!' },
  'success.description': {
    ar: 'تم تفعيل اشتراكك بنجاح، ويمكنك الآن إدارة بريد عملك. تم إرسال إيصال الدفع إلى بريد المشرف.',
    en: 'Your subscription is active. You can now manage your business email. A payment receipt has been sent to the admin email.',
  },
  'success.paymentConfirmed': { ar: 'تم تأكيد الدفع', en: 'Payment Confirmed' },
  'success.invoiceLabel': { ar: 'فاتورة', en: 'Invoice' },
  'success.emailPlan': { ar: 'باقة البريد', en: 'Email Plan' },
  'success.monthlyBilling': { ar: 'فوترة شهرية', en: 'Monthly billing' },
  'success.domain': { ar: 'النطاق', en: 'Domain' },
  'success.paymentMethod': { ar: 'طريقة الدفع', en: 'Payment Method' },
  'success.methodCard': { ar: 'دفع بالبطاقة', en: 'Card payment' },
  'success.billingDate': { ar: 'تاريخ الفوترة', en: 'Billing Date' },
  'success.nextInvoice': { ar: 'الفاتورة القادمة', en: 'Next Invoice' },
  'dashboard.domainsManage': { ar: 'أدِر نطاقاتك هنا.', en: 'Manage your domains here.' },
  'dashboard.billingViewHint': { ar: 'اعرض الفواتير وطرق الدفع.', en: 'View invoices and payment methods.' },
  'lang.ar': { ar: 'العربية', en: 'Arabic' },
  'lang.en': { ar: 'English', en: 'English' },
  'register.title': { ar: 'أنشئ حسابك', en: 'Create Your Account' },
  'register.subtitle': { ar: 'الرجاء إدخال تفاصيل حسابك لإكمال الاشتراك.', en: 'Please enter your account details to complete your subscription.' },
  'register.continuePayment': { ar: 'تابع إلى الدفع', en: 'Continue to Payment' },
  'register.back': { ar: 'العودة إلى الخطوة السابقة', en: 'Back to previous step' },
  'register.passwordMismatch': { ar: 'كلمتا المرور غير متطابقتين', en: 'Passwords do not match' },
  'payment.subtitle': { ar: 'راجِع تفاصيل الطلب وأكمل الدفع لتفعيل خدماتك.', en: 'Please review your order details and complete payment to activate your services.' },
  'phone.title': { ar: 'تسجيل رقم الهاتف', en: 'Phone Number Registration' },
  'phone.subtitle': { ar: 'اختر كود الدولة وأدخل رقم هاتفك.', en: 'Select your country code and enter your phone number.' },
  'phone.continue': { ar: 'متابعة', en: 'Continue' },
  'phone.back': { ar: 'رجوع', en: 'Back' },
};

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('ar');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? (localStorage.getItem('locale') as Locale | null) : null;
    if (saved && (saved === 'ar' || saved === 'en')) {
      setLocale(saved);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', locale);
    }
  }, [locale]);

  const value = useMemo<LocaleContextValue>(() => {
    return {
      locale,
      setLocale,
      t: (key: string) => dict[key]?.[locale] ?? key,
      dir: locale === 'ar' ? 'rtl' : 'ltr',
    };
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('LocaleProvider not found');
  }
  return ctx;
}
