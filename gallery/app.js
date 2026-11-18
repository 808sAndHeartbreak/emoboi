// ==================== 分类筛选 ====================
        const categoryTabs = document.querySelectorAll('.category-tab');
        const galleryItems = document.querySelectorAll('.gallery-item');
        const currentFilterEl = document.getElementById('current-filter');
        const visibleCountEl = document.getElementById('visible-count');

        const categoryNames = {
            'all': 'ALL ARCHIVE',
            'anime': 'ANIME',
            'artist': 'ARTIST',
            'meow': 'MEOW',
            'art': 'ART'
        };

        let currentFilter = 'all';
        visibleCountEl.textContent=galleryItems.length;
        categoryTabs.forEach(tab=>{
            const count=tab.dataset.category==='all'?galleryItems.length:[...galleryItems].filter(item=>item.dataset.category===tab.dataset.category).length;
            tab.querySelector('.count').textContent='('+count+')';
            tab.setAttribute('aria-pressed',String(tab.dataset.category==='all'));
        });

        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.dataset.category;
                filterGallery(category);
            });
        });

        function filterGallery(category) {
            currentFilter = category;
            
            // 更新标签状态
            categoryTabs.forEach(tab => {
                tab.setAttribute('aria-pressed',String(tab.dataset.category===category));
                if (tab.dataset.category === category) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });

            // 筛选图片
            let visibleCount = 0;
            galleryItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.classList.remove('hidden');
                    visibleCount++;
                } else {
                    item.classList.add('hidden');
                }
            });

            // 更新显示信息
            currentFilterEl.textContent = `${categoryNames[category] || category.toUpperCase()}`;
            visibleCountEl.textContent = visibleCount;
        }

        // ==================== Lightbox ====================
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxCounter = document.getElementById('lightbox-counter');

        let currentImageIndex = 0;
        let visibleImages = [];

        function updateVisibleImages() {
            visibleImages = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
        }

        galleryItems.forEach(item => {
            item.setAttribute('tabindex','0');
            item.setAttribute('role','button');
            item.setAttribute('aria-label','查看 '+item.querySelector('img').alt);
            item.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();item.click();}});
            item.addEventListener('click', () => {
                updateVisibleImages();
                currentImageIndex = visibleImages.indexOf(item);
                showImage(currentImageIndex);
                lightbox.showModal();
            });
        });

        function showImage(index) {
            const item = visibleImages[index];
            const img = item.querySelector('img');
            const title = item.querySelector('.info .title').textContent;
            
            lightboxImg.src = img.dataset.full || img.src;
            lightboxImg.alt = img.alt;
            lightboxTitle.textContent = title;
            lightboxCounter.textContent = `${index + 1} / ${visibleImages.length}`;
        }

        function closeLightbox() {
            lightbox.close();
        }

        function prevImage() {
            currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
            showImage(currentImageIndex);
        }

        function nextImage() {
            currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
            showImage(currentImageIndex);
        }

        document.addEventListener('keydown', (e) => {
            if (!lightbox.open) return;
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        });



        // ==================== 回到顶部按钮 ====================
        const backToTopBtn = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // ==================== 全屏菜单 ====================




        // ==================== 初始化 Lucide 图标 ====================
        document.addEventListener('DOMContentLoaded', () => {
            lucide.createIcons();
        });

        // ==================== 初始化 ====================
        document.addEventListener('DOMContentLoaded', () => {
            updateVisibleImages();
        });
