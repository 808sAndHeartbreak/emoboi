// ==================== 音乐播放器 ====================
        const audio = document.getElementById('audio-player');
        const video = document.getElementById('video-player');
        const playBtn = document.getElementById('play-btn');
        const playIcon = document.getElementById('play-icon');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const shuffleBtn = document.getElementById('shuffle-btn');
        const volumeBtn = document.getElementById('volume-btn');
        const volumeIcon = document.getElementById('volume-icon');
        const volumeSlider = document.getElementById('volume-slider');
        const trackTitle = document.getElementById('track-title');
        const trackArtist = document.getElementById('track-artist');
        const albumCover = document.getElementById('album-cover');
        const albumCoverContainer = document.getElementById('album-cover-container');
        const videoTrackTitle = document.getElementById('video-track-title');
        const videoTrackArtist = document.getElementById('video-track-artist');
        const nowPlayingInfo = document.getElementById('now-playing-info');
        const videoContainer = document.getElementById('video-container');
        const progressBar = document.getElementById('progress-bar');
        const progressFill = document.getElementById('progress-fill');
        const currentTimeEl = document.getElementById('current-time');
        const durationEl = document.getElementById('duration');
        const playlistEl = document.getElementById('playlist');
        const trackCountEl = document.getElementById('track-count');

        let currentPlayer = audio; // 当前活动的媒体元素
        let currentMediaType = 'audio'; // 当前媒体类型

        // 播放列表配置 - 支持音频(MP3)和视频(MP4)
        const playlist = [
            // 视频区域
            { 
                title: "BOWSER", 
                artist: "Lil Tracy",
                src: "videos/Lil Tracy - BOWSER .mp4",
                poster: "covers/bowser-poster.webp",
                type: "video",
                duration: "2:04"
            },
            { 
                title: "jeans", 
                artist: "2hollis",
                src: "videos/2hollis - jeans.mp4",
                type: "video",
                duration: "3:01"
            },
            { 
                title: "Bamb", 
                artist: "fakemink",
                src: "videos/fakemink - Bamb.mp4",
                type: "video",
                duration: "2:04"
            },
            { 
                title: "Bad Enough", 
                artist: "Corey Lingo",
                src: "videos/Corey Lingo - Bad Enough.mp4",
                type: "video",
                duration: "2:17"
            },
            // 音频区域
            { 
                title: "either on or off the drugs", 
                artist: "JPEGMAFIA",
                src: "tracks/JPEGMAFIA - either on or off the drugs.mp3",
                type: "audio",
                cover: "covers/JPEGMAFIA - either on or off the drugs.jpg",
                duration: "2:20"
            },
            { 
                title: "Acura Integurl", 
                artist: "Frank Ocean",
                src: "tracks/Acura Integurl - Frank Ocean.mp3",
                type: "audio",
                cover: "covers/Acura Integurl - Frank Ocean.jpg",
                duration: "1:59"
            },
            { 
                title: "Suspended", 
                artist: "Sampha",
                src: "tracks/Suspended - Sampha.mp3",
                type: "audio",
                cover: "covers/Sampha - Suspended.jpg",
                duration: "3:05"
            },
            { 
                title: "Street Lights", 
                artist: "Kanye West",
                src: "tracks/Street Lights-Kanye West.mp3",
                type: "audio",
                cover: "covers/Street Lights-Kanye West.jpg",
                duration: "3:09"
            }
        ];

        let currentTrack = 0;
        let isPlaying = false;
        let isMuted = false;
        let isShuffleMode = false; // 随机播放模式

        // 初始化
        function initPlayer() {
            updateTrackInfo();
            renderPlaylist();
            audio.volume = volumeSlider.value / 100;
            video.volume = volumeSlider.value / 100;
            trackCountEl.textContent = `${playlist.length} TRACKS`;
            
            // 设置初始播放图标
            playIcon.style.marginLeft = '5px'; // 播放图标视觉居中偏移
            playIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
            
            // 设置初始音量图标
            volumeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>';
        }

        // 更新曲目信息并切换媒体类型
        function updateTrackInfo() {
            const track = playlist[currentTrack];
            const isVideo = track.type === 'video';
            document.getElementById('media-status').textContent='';
            
            // 停止当前播放
            currentPlayer.pause();
            currentPlayer.removeAttribute('src');
            currentPlayer.load();
            updatePauseButtonUI();
            
            // 切换媒体类型
            currentMediaType = track.type;
            
            if (isVideo) {
                // 切换到视频模式
                currentPlayer = video;
                if(track.poster)video.poster=track.poster;else video.removeAttribute('poster');
                
                // 显示视频,隐藏音频信息
                nowPlayingInfo.style.display = 'none';
                videoContainer.style.display = 'block';
                
                // 更新视频叠加层信息
                videoTrackTitle.textContent = track.title;
                videoTrackArtist.textContent = track.artist;
            } else {
                // 切换到音频模式
                currentPlayer = audio;
                
                // 显示音频信息,隐藏视频
                nowPlayingInfo.style.display = 'block';
                videoContainer.style.display = 'none';
                
                // 更新音频信息
                trackTitle.textContent = track.title;
                trackArtist.textContent = track.artist;
                
                // 更新专辑封面
                if (track.cover) {
                    albumCover.src = track.cover;
                    albumCover.style.display = 'block';
                    albumCoverContainer.style.display = 'flex';
                } else {
                    // 没有封面时隐藏
                    albumCover.style.display = 'none';
                    albumCoverContainer.style.display = 'none';
                }
            }
            
            // 加载新媒体
            currentPlayer.load();
            currentTimeEl.textContent='0:00';durationEl.textContent=track.duration;
            progressFill.style.width='0%';progressBar.setAttribute('aria-valuenow','0');
            
            // 重新设置事件监听器
            setupMediaListeners();
            
            // 更新播放列表高亮
            renderPlaylist();
        }

        // 渲染播放列表
        function renderPlaylist() {
            playlistEl.innerHTML = '';
            playlist.forEach((track, i) => {
                const div = document.createElement('div');
                div.className = `track-item flex justify-between items-center cursor-pointer py-3 ${currentTrack === i ? 'active' : 'text-zinc-600'}`;
                
                // 为视频添加图标
                const videoIcon = track.type === 'video' 
                    ? '<i data-lucide="video" class="w-3.5 h-3.5 mr-1.5 inline-block" style="vertical-align: -2px;"></i>' 
                    : '';
                
                div.innerHTML = `
                    <div class="flex items-center gap-4">
                        <span class="mono text-xs w-6">${String(i + 1).padStart(2, '0')}</span>
                        <div>
                            <span class="text-base font-bold italic tracking-tighter uppercase block">${track.title}</span>
                            <span class="mono text-xs text-zinc-400">${track.artist}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        ${videoIcon}
                        <span class="mono text-[10px]">${track.duration}</span>
                    </div>
                `;
                div.addEventListener('click', () => {
                    currentTrack = i;
                    updateTrackInfo();
                    playTrack();
                });
                div.tabIndex=0;div.setAttribute('role','button');div.setAttribute('aria-label',track.title+' — '+track.artist);
                div.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();div.click();}});
                playlistEl.appendChild(div);
            });
            
            // 重新渲染图标
            lucide.createIcons();
        }

        // 播放
        function playTrack() {
            if(currentPlayer.getAttribute('src')!==playlist[currentTrack].src){currentPlayer.src=playlist[currentTrack].src;currentPlayer.load();}
            // 使用当前活动的媒体元素播放
            const playPromise = currentPlayer.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // UI更新由 play 事件监听器自动处理
                }).catch(err => {
                    if(err.name==='AbortError')return;
                    updatePauseButtonUI();
                    document.getElementById('media-status').textContent='暂时无法播放，请重试或切换曲目。';
                });
            }
        }

        // 暂停
        function pauseTrack() {
            currentPlayer.pause();
            // UI更新由 pause 事件监听器自动处理
        }

        // 播放/暂停切换
        playBtn.addEventListener('click', () => {
            if (isPlaying) {
                pauseTrack();
            } else {
                playTrack();
            }
        });

        // 上一曲
        prevBtn.addEventListener('click', () => {
            const resume=isPlaying;
            currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
            updateTrackInfo();
            if (resume) playTrack();
        });

        // 下一曲 (支持随机模式)
        nextBtn.addEventListener('click', () => {
            playNextTrack();
        });

        // 随机播放切换
        shuffleBtn.addEventListener('click', () => {
            isShuffleMode = !isShuffleMode;
            shuffleBtn.classList.toggle('active');
            shuffleBtn.setAttribute('aria-pressed',String(isShuffleMode));
        });

        // 播放下一曲 (考虑随机模式)
        function playNextTrack() {
            const resume=isPlaying||currentPlayer.ended;
            if (isShuffleMode) {
                // 随机模式: 随机选择一首不同的歌曲
                let nextIndex;
                do {
                    nextIndex = Math.floor(Math.random() * playlist.length);
                } while (nextIndex === currentTrack && playlist.length > 1);
                currentTrack = nextIndex;
            } else {
                // 顺序模式: 下一首
                currentTrack = (currentTrack + 1) % playlist.length;
            }
            updateTrackInfo();
            if (resume) playTrack();
        }

        // 静音切换
        volumeBtn.addEventListener('click', () => {
            isMuted = !isMuted;
            audio.muted = isMuted;
            video.muted = isMuted;
            
            if (isMuted) {
                // 静音图标 (带斜杠)
                volumeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';
            } else {
                // 正常音量图标
                volumeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>';
            }
        });

        // 音量滑块
        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            audio.volume = volume;
            video.volume = volume;
            
            // 如果音量为0,显示静音图标
            if (volume === 0) {
                volumeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';
            } else {
                // 正常音量图标
                volumeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>';
                // 如果之前是静音状态,取消静音
                if (isMuted) {
                    isMuted = false;
                    audio.muted = false;
                    video.muted = false;
                }
            }
        });
        
        // 音量滑块触摸增强 - 添加触摸反馈
        volumeSlider.addEventListener('touchstart', (e) => {
            volumeSlider.style.transform = 'scaleY(1.2)';
            volumeSlider.style.transition = 'transform 0.1s ease';
        });
        
        volumeSlider.addEventListener('touchend', (e) => {
            volumeSlider.style.transform = 'scaleY(1)';
        });
        
        volumeSlider.addEventListener('touchcancel', (e) => {
            volumeSlider.style.transform = 'scaleY(1)';
        });

        // 更新播放按钮UI为播放状态（显示暂停图标）
        function updatePlayButtonUI() {
            isPlaying = true;
            playIcon.style.marginLeft = '0'; // 暂停图标居中,不需要偏移
            playIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
        }

        // 更新播放按钮UI为暂停状态（显示播放图标）
        function updatePauseButtonUI() {
            isPlaying = false;
            playIcon.style.marginLeft = '5px'; // 播放图标需要偏移
            playIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
        }

        // 处理媒体播放事件（包括外部控制）
        function handleMediaPlay() {
            updatePlayButtonUI();
        }

        // 处理媒体暂停事件（包括外部控制）
        function handleMediaPause() {
            updatePauseButtonUI();
        }

        // 进度条更新 - 监听当前播放器
        function setupMediaListeners() {
            // 移除旧的监听器
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('error', handleMediaError);
            audio.removeEventListener('ended', handleMediaEnded);
            audio.removeEventListener('play', handleMediaPlay);
            audio.removeEventListener('pause', handleMediaPause);
            video.removeEventListener('timeupdate', updateProgress);
            video.removeEventListener('loadedmetadata', updateDuration);
            video.removeEventListener('error', handleMediaError);
            video.removeEventListener('ended', handleMediaEnded);
            video.removeEventListener('play', handleMediaPlay);
            video.removeEventListener('pause', handleMediaPause);
            
            // 添加新的监听器到当前播放器
            currentPlayer.addEventListener('timeupdate', updateProgress);
            currentPlayer.addEventListener('loadedmetadata', updateDuration);
            currentPlayer.addEventListener('error', handleMediaError);
            currentPlayer.addEventListener('ended', handleMediaEnded);
            currentPlayer.addEventListener('play', handleMediaPlay);
            currentPlayer.addEventListener('pause', handleMediaPause);
        }

        function updateProgress() {
            if (currentPlayer.duration) {
                const progress = (currentPlayer.currentTime / currentPlayer.duration) * 100;
                progressBar.setAttribute('aria-valuenow',String(Math.round((currentPlayer.currentTime / currentPlayer.duration || 0)*100)));
            progressFill.style.width = progress + '%';
                currentTimeEl.textContent = formatTime(currentPlayer.currentTime);
            }
        }

        function updateDuration() {
            durationEl.textContent = formatTime(currentPlayer.duration);
        }

        function handleMediaError(e) {
            document.getElementById('media-status').textContent='媒体暂时无法加载，请切换曲目或重试。';
            pauseTrack();
        }

        function handleMediaEnded() {
            playNextTrack();
        }

        // 初始化时设置监听器
        setupMediaListeners();

        progressBar.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const d=currentPlayer.duration;if(!Number.isFinite(d)||d<=0)return;currentPlayer.currentTime=e.key==='Home'?0:e.key==='End'?d:Math.max(0,Math.min(d,currentPlayer.currentTime+(e.key==='ArrowRight'?5:-5)));updateProgress();});
        // 点击进度条跳转 (支持音频和视频)
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            if (currentPlayer.duration) {
                currentPlayer.currentTime = percent * currentPlayer.duration;
            }
        });

        // 进度条拖动功能 (支持鼠标和触摸)
        let isDragging = false;

        // 鼠标事件
        progressBar.addEventListener('mousedown', (e) => {
            isDragging = true;
            progressBar.style.transform = 'scaleY(1.3)';
            progressBar.style.transition = 'transform 0.1s ease';
            updateProgressFromMouse(e);
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                updateProgressFromMouse(e);
            }
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
            isDragging = false;
                progressBar.style.transform = 'scaleY(1)';
            }
        });

        // 触摸事件
        progressBar.addEventListener('touchstart', (e) => {
            isDragging = true;
            progressBar.style.transform = 'scaleY(1.3)';
            progressBar.style.transition = 'transform 0.1s ease';
            updateProgressFromTouch(e);
            e.stopPropagation(); // 防止事件冒泡
        }, { passive: false });

        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                updateProgressFromTouch(e);
            }
        }, { passive: false });

        document.addEventListener('touchend', () => {
            if (isDragging) {
                isDragging = false;
                progressBar.style.transform = 'scaleY(1)';
            }
        });
        
        document.addEventListener('touchcancel', () => {
            if (isDragging) {
                isDragging = false;
                progressBar.style.transform = 'scaleY(1)';
            }
        });

        function updateProgressFromMouse(e) {
            const rect = progressBar.getBoundingClientRect();
            let percent = (e.clientX - rect.left) / rect.width;
            percent = Math.max(0, Math.min(1, percent)); // 限制在 0-1 之间
            
            if (currentPlayer.duration) {
                currentPlayer.currentTime = percent * currentPlayer.duration;
            }
        }

        function updateProgressFromTouch(e) {
            e.preventDefault(); // 防止页面滚动
            const touch = e.touches[0] || e.changedTouches[0];
            if (!touch) return;
            
            const rect = progressBar.getBoundingClientRect();
            let percent = (touch.clientX - rect.left) / rect.width;
            percent = Math.max(0, Math.min(1, percent)); // 限制在 0-1 之间
            
            if (currentPlayer.duration && !isNaN(currentPlayer.duration)) {
                currentPlayer.currentTime = percent * currentPlayer.duration;
            }
        }

        // 格式化时间
        function formatTime(seconds) {
            if (isNaN(seconds)) return '0:00';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }

        // ==================== 视频控制 ====================
        const exitVideoBtn = document.getElementById('exit-video-btn');
        const fullscreenBtn = document.getElementById('fullscreen-btn');

        // 退出视频 - 跳到下一首音频
        exitVideoBtn.addEventListener('click', () => {
            // 找到下一首非视频曲目
            let nextIndex = (currentTrack + 1) % playlist.length;
            let attempts = 0;
            while (playlist[nextIndex].type === 'video' && attempts < playlist.length) {
                nextIndex = (nextIndex + 1) % playlist.length;
                attempts++;
            }
            
            if (playlist[nextIndex].type === 'audio') {
                currentTrack = nextIndex;
                updateTrackInfo();
                if (isPlaying) playTrack();
            } else {
                // 如果全是视频,就暂停并停留在当前
                pauseTrack();
            }
        });

        // 全屏切换
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                videoContainer.requestFullscreen().catch(err => {
                    // 静默失败，某些浏览器不支持全屏
                });
            } else {
                document.exitFullscreen();
            }
        });

        // 监听全屏变化,更新图标
        document.addEventListener('fullscreenchange', () => {
            const icon = fullscreenBtn.querySelector('[data-lucide]');
            if (document.fullscreenElement) {
                icon.setAttribute('data-lucide', 'minimize');
            } else {
                icon.setAttribute('data-lucide', 'maximize');
            }
            lucide.createIcons();
        });

        // ==================== 菜单 ====================




        // ==================== 全局快捷键 ====================
        document.addEventListener('keydown', (e) => {
            if(document.querySelector('dialog[open]')||e.target.closest('button,a,input,textarea,select,[contenteditable],[role=slider],[role=button]'))return;
            // ESC - 关闭菜单或退出视频
            if (e.key === 'Escape') {
                if (currentMediaType === 'video' && videoContainer.style.display !== 'none') {
                    // 退出视频播放
                    exitVideoBtn.click();
                }
            }
            
            // 空格 - 播放/暂停 (防止页面滚动)
            if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                if (isPlaying) {
                    pauseTrack();
                } else {
                    playTrack();
                }
            }
            
            // 左箭头 - 上一曲
            if (e.key === 'ArrowLeft' && e.target.tagName !== 'INPUT') {
                e.preventDefault();
                prevBtn.click();
            }
            
            // 右箭头 - 下一曲
            if (e.key === 'ArrowRight' && e.target.tagName !== 'INPUT') {
                e.preventDefault();
                nextBtn.click();
            }
        });

        // ==================== 播放列表折叠 ====================
        const togglePlaylistBtn = document.getElementById('toggle-playlist');
        let playlistExpanded = true;

        togglePlaylistBtn.addEventListener('click', () => {
            playlistExpanded = !playlistExpanded;
            togglePlaylistBtn.setAttribute('aria-expanded',String(playlistExpanded));
            const chevronIcon = togglePlaylistBtn.querySelector('[data-lucide]');
            
            if (playlistExpanded) {
                playlistEl.style.maxHeight = '500px';
                playlistEl.style.opacity = '1';
                chevronIcon.setAttribute('data-lucide', 'chevron-up');
            } else {
                playlistEl.style.maxHeight = '0';
                playlistEl.style.opacity = '0';
                chevronIcon.setAttribute('data-lucide', 'chevron-down');
            }
            
            // 重新渲染图标
            lucide.createIcons();
        });

        // ==================== 回到顶部按钮 ====================
        const backToTopBtn = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // ==================== 初始化 Lucide 图标 ====================
        // 立即初始化一次图标
        lucide.createIcons();
        
        // DOM加载完成后再初始化一次，确保所有图标都正确渲染
        document.addEventListener('DOMContentLoaded', () => {
            lucide.createIcons();
        });

        // ==================== 初始化 ====================
        document.addEventListener('DOMContentLoaded', () => {
            initPlayer();
            // 页面完全加载后再次初始化图标，确保没有遗漏
            lucide.createIcons();
        });
