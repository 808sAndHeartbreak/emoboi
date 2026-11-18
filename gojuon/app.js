// 初始化 Lucide Icons
    document.addEventListener('DOMContentLoaded', () => {
        lucide.createIcons();
    });

    // ==================== 菜单控制 ====================




    // 五十音图数据 - 完整11行 (a~n)
    // 布局: 5列 × 11行 = 55格
    const kanaData = [
        // あ行 (a)
        { r: 'a',  h: 'あ', k: 'ア', o1: '安', o2: '阿' },
        { r: 'i',  h: 'い', k: 'イ', o1: '以', o2: '伊' },
        { r: 'u',  h: 'う', k: 'ウ', o1: '宇', o2: '宇' },
        { r: 'e',  h: 'え', k: 'エ', o1: '衣', o2: '江' },
        { r: 'o',  h: 'お', k: 'オ', o1: '於', o2: '於' },
        // か行 (ka)
        { r: 'ka', h: 'か', k: 'カ', o1: '加', o2: '加' },
        { r: 'ki', h: 'き', k: 'キ', o1: '幾', o2: '幾' },
        { r: 'ku', h: 'く', k: 'ク', o1: '久', o2: '久' },
        { r: 'ke', h: 'け', k: 'ケ', o1: '計', o2: '介' },
        { r: 'ko', h: 'こ', k: 'コ', o1: '己', o2: '己' },
        // さ行 (sa)
        { r: 'sa', h: 'さ', k: 'サ', o1: '左', o2: '散' },
        { r: 'shi',h: 'し', k: 'シ', o1: '之', o2: '之' },
        { r: 'su', h: 'す', k: 'ス', o1: '寸', o2: '須' },
        { r: 'se', h: 'せ', k: 'セ', o1: '世', o2: '世' },
        { r: 'so', h: 'そ', k: 'ソ', o1: '曽', o2: '曽' },
        // た行 (ta)
        { r: 'ta', h: 'た', k: 'タ', o1: '太', o2: '多' },
        { r: 'chi',h: 'ち', k: 'チ', o1: '知', o2: '千' },
        { r: 'tsu',h: 'つ', k: 'ツ', o1: '川', o2: '川' },
        { r: 'te', h: 'て', k: 'テ', o1: '天', o2: '天' },
        { r: 'to', h: 'と', k: 'ト', o1: '止', o2: '止' },
        // な行 (na)
        { r: 'na', h: 'な', k: 'ナ', o1: '奈', o2: '奈' },
        { r: 'ni', h: 'に', k: 'ニ', o1: '仁', o2: '二' },
        { r: 'nu', h: 'ぬ', k: 'ヌ', o1: '奴', o2: '奴' },
        { r: 'ne', h: 'ね', k: 'ネ', o1: '祢', o2: '祢' },
        { r: 'no', h: 'の', k: 'ノ', o1: '乃', o2: '乃' },
        // は行 (ha)
        { r: 'ha', h: 'は', k: 'ハ', o1: '波', o2: '八' },
        { r: 'hi', h: 'ひ', k: 'ヒ', o1: '比', o2: '比' },
        { r: 'fu', h: 'ふ', k: 'フ', o1: '不', o2: '不' },
        { r: 'he', h: 'へ', k: 'ヘ', o1: '部', o2: '部' },
        { r: 'ho', h: 'ほ', k: 'ホ', o1: '保', o2: '保' },
        // ま行 (ma)
        { r: 'ma', h: 'ま', k: 'マ', o1: '末', o2: '万' },
        { r: 'mi', h: 'み', k: 'ミ', o1: '美', o2: '三' },
        { r: 'mu', h: 'む', k: 'ム', o1: '武', o2: '牟' },
        { r: 'me', h: 'め', k: 'メ', o1: '女', o2: '女' },
        { r: 'mo', h: 'も', k: 'モ', o1: '毛', o2: '毛' },
        // や行 (ya) - yi, ye 不存在
        { r: 'ya', h: 'や', k: 'ヤ', o1: '也', o2: '也' },
        null,
        { r: 'yu', h: 'ゆ', k: 'ユ', o1: '由', o2: '由' },
        null,
        { r: 'yo', h: 'よ', k: 'ヨ', o1: '与', o2: '與' },
        // ら行 (ra)
        { r: 'ra', h: 'ら', k: 'ラ', o1: '良', o2: '良' },
        { r: 'ri', h: 'り', k: 'リ', o1: '利', o2: '利' },
        { r: 'ru', h: 'る', k: 'ル', o1: '留', o2: '流' },
        { r: 're', h: 'れ', k: 'レ', o1: '礼', o2: '礼' },
        { r: 'ro', h: 'ろ', k: 'ロ', o1: '呂', o2: '呂' },
        // わ行 (wa) - wi, wu, we 不存在
        { r: 'wa', h: 'わ', k: 'ワ', o1: '和', o2: '和' },
        null,
        null,
        null,
        { r: 'wo', h: 'を', k: 'ヲ', o1: '遠', o2: '乎' },
        // ん行 (n) - 独立成行，最左侧
        { r: 'n',  h: 'ん', k: 'ン', o1: '無', o2: '尔' },
        null,
        null,
        null,
        null
    ];

    // 页面初始化
    document.addEventListener('DOMContentLoaded', () => {
        renderGrid();
        initDropdown();
        initQuiz();
    });

    // ==================== 下拉菜单控制 ====================
    function initDropdown() {
        const dropdownBtn = document.getElementById('display-dropdown-btn');
        const dropdownMenu = document.getElementById('display-dropdown');
        const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');

        // 点击按钮切换下拉菜单
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownBtn.classList.toggle('active');
            dropdownMenu.classList.toggle('active');
        });

        // 点击选项切换显隐
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                item.classList.toggle('active');
                syncDisplay();
            });
        });

        // 点击外部关闭下拉菜单
        document.addEventListener('click', () => {
            dropdownBtn.classList.remove('active');
            dropdownMenu.classList.remove('active');
        });

        // 初始化显隐状态
        syncDisplay();
    }

    // 五十音图渲染逻辑 - 渲染全部数据
    function renderGrid() {
        const gridEl = document.getElementById('main-grid');
        gridEl.innerHTML = '';
        kanaData.forEach((item, index) => {
            // 在最后一行的最右边（索引54）插入 Wallpaper 按钮
            if (index === 54) {
                gridEl.appendChild(createWallpaperCell());
            } else {
                gridEl.appendChild(createCell(item));
            }
        });
        syncDisplay();
        
    }

    function createCell(item) {
        const cell = document.createElement('div');
        if (!item) {
            cell.className = 'kana-cell empty';
            return cell;
        }
        cell.className = 'kana-cell';
        cell.innerHTML = `
            <div class="cell-romaji">${item.r}</div>
            <div class="kana-focus-zone">
                <span class="char-unit hira" tabindex="0">${item.h}</span>
                <span class="char-unit kata" tabindex="0">${item.k}</span>
            </div>
            <div class="cell-origin">
                <span class="origin-part o1">${item.o1}</span>
                <span class="origin-part o2">${item.o2}</span>
            </div>`;

        const hira = cell.querySelector('.hira');
        const kata = cell.querySelector('.kata');
        const o1 = cell.querySelector('.o1');
        const o2 = cell.querySelector('.o2');
        const romaji = cell.querySelector('.cell-romaji');

        // 绑定交互（支持鼠标和触摸）
        const bindInteraction = (trigger, target, romajiEl) => {
            const activate = () => {
                target.classList.add('origin-active', 'linked-active');
                romajiEl.classList.add('romaji-active');
            };
            const deactivate = () => {
                target.classList.remove('origin-active', 'linked-active');
                romajiEl.classList.remove('romaji-active');
            };
            
            // 鼠标事件
            trigger.addEventListener('mouseenter', activate);
            trigger.addEventListener('mouseleave', deactivate);
            
            // 触摸事件
            trigger.addEventListener('touchstart', activate, { passive: true });
            trigger.addEventListener('touchend', deactivate, { passive: true });
            
            // 键盘可访问性
            trigger.addEventListener('focus', activate);
            trigger.addEventListener('blur', deactivate);
        };

        bindInteraction(hira, o1, romaji);
        bindInteraction(kata, o2, romaji);
        bindInteraction(o1, hira, romaji);
        bindInteraction(o2, kata, romaji);
        
        return cell;
    }

    // 创建 Wallpaper Engine 按钮单元格
    function createWallpaperCell() {
        const cell = document.createElement('div');
        cell.className = 'kana-cell';
        cell.style.padding = '0'; // 移除内边距，让按钮填满整个格子
        cell.innerHTML = `<button class="wallpaper-btn">Wallpaper<br>Engine</button>`;
        
        const btn = cell.querySelector('.wallpaper-btn');
        btn.addEventListener('click', () => {
            document.getElementById('wallpaper-modal').showModal();
        });
        
        
        return cell;
    }

    function syncDisplay() {
        const items = document.querySelectorAll('#display-dropdown .dropdown-item');
        items.forEach(item => {
            const targetClass = item.getAttribute('data-target');
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.' + targetClass).forEach(el => {
                el.classList.toggle('hidden-content', !isActive);
            });
        });
    }

    // ==================== 测试系统 ====================
    let quizSettings = {
        kanaType: 'hira',      // hira, kata, both
        direction: 'kanaToRomaji', // kanaToRomaji, romajiToKana
        questionType: 'choice' // choice, fill
    };
    let currentQuestion = null;
    let userAnswer = '';
    let quizStats = { correct: 0, total: 0 };

    // 从localStorage加载统计数据
    function loadQuizStats() {
        const saved = localStorage.getItem('gojuon-quiz-stats');
        if (saved) {
            quizStats = JSON.parse(saved);
            updateStatsDisplay();
        }
    }

    // 保存统计数据
    function saveQuizStats() {
        localStorage.setItem('gojuon-quiz-stats', JSON.stringify(quizStats));
    }

    // 更新统计显示
    function updateStatsDisplay() {
        const display = document.getElementById('quiz-stats-display');
        if (display) {
            display.textContent = `${quizStats.correct}/${quizStats.total}`;
        }
    }

    // 重置统计数据
    function resetQuizStats() {
        if (confirm('确定要重置战绩吗？')) {
            quizStats = { correct: 0, total: 0 };
            saveQuizStats();
            updateStatsDisplay();
        }
    }

    function initQuiz() {
        const quizBtn = document.getElementById('quiz-btn');
        const quizModal = document.getElementById('quiz-modal');
        const quizClose = document.getElementById('quiz-close');
        const quizStart = document.getElementById('quiz-start');
        const quizSetup = document.getElementById('quiz-setup');
        const quizQuestionArea = document.getElementById('quiz-question-area');

        // 加载统计数据
        loadQuizStats();

        // 打开测试弹窗
        quizBtn.addEventListener('click', () => {
            quizModal.showModal();
            showQuizSetup();
        });

        // 重置战绩
        document.getElementById('quiz-reset-stats').addEventListener('click', () => {
            resetQuizStats();
        });

        // 关闭测试弹窗
        quizClose.addEventListener('click', () => {
            quizModal.close();
        });



        // 设置选项点击
        document.querySelectorAll('.quiz-options').forEach(group => {
            const setting = group.dataset.setting;
            group.querySelectorAll('.quiz-option').forEach(opt => {
                opt.addEventListener('click', () => {
                    group.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
                    opt.classList.add('selected');
                    quizSettings[setting] = opt.dataset.value;
                });
            });
        });

        // 开始测试
        quizStart.addEventListener('click', () => {
            startQuiz();
        });

        // 调整设置按钮
        document.getElementById('quiz-settings-btn').addEventListener('click', () => {
            showQuizSetup();
        });

        // 下一题按钮
        document.getElementById('quiz-next-btn').addEventListener('click', () => {
            generateQuestion();
        });

        // 填空题提交
        document.getElementById('quiz-submit').addEventListener('click', () => {
            checkFillAnswer();
        });

        // 填空题输入框回车提交
        document.getElementById('quiz-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                checkFillAnswer();
            }
        });

        // 填空题显示答案
        document.getElementById('quiz-skip').addEventListener('click', () => {
            skipQuestion();
        });

        // 选择题显示答案
        document.getElementById('quiz-choice-skip-btn').addEventListener('click', () => {
            skipQuestion();
        });

        // 假名选择器
        document.getElementById('open-kana-picker').addEventListener('click', () => {
            openKanaPicker();
        });



        document.getElementById('kana-picker-close').addEventListener('click', () => {
            document.getElementById('kana-picker').close();
        });
    }

    function showQuizSetup() {
        document.getElementById('quiz-setup').style.display = 'block';
        document.getElementById('quiz-question-area').classList.remove('active');
    }

    function startQuiz() {
        document.getElementById('quiz-setup').style.display = 'none';
        document.getElementById('quiz-question-area').classList.add('active');
        generateQuestion();
    }

    // 获取有效假名数据（排除null）
    function getValidKana() {
        return kanaData.filter(item => item !== null);
    }

    // 生成题目
    function generateQuestion() {
        const validKana = getValidKana();
        const randomKana = validKana[Math.floor(Math.random() * validKana.length)];
        
        // 根据设置决定使用哪种假名
        let kanaChar, kanaType;
        if (quizSettings.kanaType === 'both') {
            kanaType = Math.random() > 0.5 ? 'hira' : 'kata';
        } else {
            kanaType = quizSettings.kanaType;
        }
        kanaChar = kanaType === 'hira' ? randomKana.h : randomKana.k;

        currentQuestion = {
            kana: kanaChar,
            kanaType: kanaType,
            romaji: randomKana.r,
            fullData: randomKana
        };

        userAnswer = '';
        
        // 重置UI
        document.getElementById('quiz-result').classList.remove('active', 'correct', 'wrong', 'skipped');
        document.getElementById('quiz-actions').style.display = 'none';
        document.getElementById('quiz-choice-skip').style.display = 'block';
        
        const quizChar = document.getElementById('quiz-char');
        const quizPrompt = document.getElementById('quiz-prompt');
        const quizChoices = document.getElementById('quiz-choices');
        const quizFillArea = document.getElementById('quiz-fill-area');

        const quizChoiceSkip = document.getElementById('quiz-choice-skip');

        if (quizSettings.direction === 'kanaToRomaji') {
            // 假名 → 读音
            quizChar.textContent = currentQuestion.kana;
            quizChar.classList.remove('romaji');
            quizPrompt.textContent = '请选择正确的读音';
            
            if (quizSettings.questionType === 'choice') {
                quizChoices.style.display = 'grid';
                quizChoiceSkip.style.display = 'block';
                quizFillArea.style.display = 'none';
                generateChoices('romaji');
            } else {
                quizChoices.style.display = 'none';
                quizChoiceSkip.style.display = 'none';
                quizFillArea.style.display = 'block';
                const inputField = document.getElementById('quiz-input');
                inputField.value = '';
                inputField.classList.remove('kana-input');
                inputField.placeholder = '输入罗马音...';
                inputField.focus();
            }
        } else {
            // 读音 → 假名
            quizChar.textContent = currentQuestion.romaji;
            quizChar.classList.add('romaji');
            quizPrompt.textContent = `请选择正确的${kanaType === 'hira' ? '平假名' : '片假名'}`;
            
            if (quizSettings.questionType === 'choice') {
                quizChoices.style.display = 'grid';
                quizChoiceSkip.style.display = 'block';
                quizFillArea.style.display = 'none';
                generateChoices('kana');
            } else {
                quizChoices.style.display = 'none';
                quizChoiceSkip.style.display = 'none';
                quizFillArea.style.display = 'block';
                const inputField = document.getElementById('quiz-input');
                inputField.value = '';
                inputField.classList.add('kana-input');
                inputField.placeholder = '输入假名...';
                inputField.focus();
            }
        }
    }

    // 生成选择题选项
    function generateChoices(answerType) {
        const quizChoices = document.getElementById('quiz-choices');
        quizChoices.innerHTML = '';
        
        const validKana = getValidKana();
        let correctAnswer = answerType === 'romaji' ? currentQuestion.romaji : currentQuestion.kana;
        
        // 生成3个错误选项
        let wrongAnswers = [];
        while (wrongAnswers.length < 3) {
            const randomKana = validKana[Math.floor(Math.random() * validKana.length)];
            let answer;
            if (answerType === 'romaji') {
                answer = randomKana.r;
            } else {
                answer = currentQuestion.kanaType === 'hira' ? randomKana.h : randomKana.k;
            }
            if (answer !== correctAnswer && !wrongAnswers.includes(answer)) {
                wrongAnswers.push(answer);
            }
        }
        
        // 混合正确答案和错误答案
        let allAnswers = [correctAnswer, ...wrongAnswers];
        allAnswers = shuffleArray(allAnswers);
        
        // 创建选项按钮
        allAnswers.forEach(answer => {
            const btn = document.createElement('button');
            btn.className = 'quiz-choice';
            if (answerType === 'romaji') {
                btn.classList.add('romaji');
            }
            btn.textContent = answer;
            btn.addEventListener('click', () => checkChoiceAnswer(btn, answer, correctAnswer));
            quizChoices.appendChild(btn);
        });
        quizChoices.querySelector('button')?.focus({preventScroll:true});
    }

    // 检查选择题答案
    function checkChoiceAnswer(btn, selected, correct) {
        const allBtns = document.querySelectorAll('.quiz-choice');
        allBtns.forEach(b => {
            b.style.pointerEvents = 'none';
            if (b.textContent === correct) {
                b.classList.add('correct');
            }
        });
        
        // 隐藏跳过按钮
        document.getElementById('quiz-choice-skip').style.display = 'none';
        
        const isCorrect = selected === correct;
        if (!isCorrect) {
            btn.classList.add('wrong');
        }
        
        showResult(isCorrect, correct);
    }

    // 填空题假名选择器
    function openKanaPicker() {
        const picker = document.getElementById('kana-picker');
        const grid = document.getElementById('kana-picker-grid');
        const title = document.getElementById('kana-picker-title');
        grid.innerHTML = '';
        
        const validKana = getValidKana();
        
        if (quizSettings.direction === 'kanaToRomaji') {
            // 选择读音
            title.textContent = '选择读音';
            grid.classList.add('romaji-grid');
            validKana.forEach(item => {
                const btn = document.createElement('button');
                btn.className = 'kana-picker-item';
                btn.style.fontFamily = "'Space Mono', monospace";
                btn.style.fontSize = '0.9rem';
                btn.textContent = item.r;
                btn.addEventListener('click', () => {
                    document.getElementById('quiz-input').value = item.r;
                    picker.close();
                });
                grid.appendChild(btn);
            });
        } else {
            // 选择假名
            title.textContent = currentQuestion.kanaType === 'hira' ? '选择平假名' : '选择片假名';
            grid.classList.remove('romaji-grid');
            kanaData.forEach(item => {
                const btn = document.createElement('button');
                btn.className = 'kana-picker-item';
                if (item) {
                    const kana = currentQuestion.kanaType === 'hira' ? item.h : item.k;
                    btn.textContent = kana;
                    btn.addEventListener('click', () => {
                        document.getElementById('quiz-input').value = kana;
                        picker.close();
                    });
                } else {
                    btn.classList.add('empty');
                }
                grid.appendChild(btn);
            });
        }
        
        picker.showModal();
    }

    // 检查填空题答案
    function checkFillAnswer() {
        const inputField = document.getElementById('quiz-input');
        const inputValue = inputField.value.trim();
        
        if (!inputValue) {
            alert('请先输入答案');
            return;
        }
        
        let correctAnswer;
        if (quizSettings.direction === 'kanaToRomaji') {
            correctAnswer = currentQuestion.romaji;
            // 罗马音不区分大小写
            const isCorrect = inputValue.toLowerCase() === correctAnswer.toLowerCase();
            showResult(isCorrect, correctAnswer);
        } else {
            correctAnswer = currentQuestion.kana;
            // 假名需要严格匹配
            const isCorrect = inputValue === correctAnswer;
            showResult(isCorrect, correctAnswer);
        }
    }

    // 跳过题目，显示答案
    function skipQuestion() {
        let correctAnswer;
        if (quizSettings.direction === 'kanaToRomaji') {
            correctAnswer = currentQuestion.romaji;
        } else {
            correctAnswer = currentQuestion.kana;
        }
        
        // 禁用选择题选项
        const allBtns = document.querySelectorAll('.quiz-choice');
        allBtns.forEach(b => {
            b.style.pointerEvents = 'none';
            if (b.textContent === correctAnswer) {
                b.classList.add('correct');
            }
        });
        
        // 隐藏跳过按钮
        document.getElementById('quiz-choice-skip').style.display = 'none';
        
        showResult('skipped', correctAnswer);
    }

    // 显示结果
    function showResult(status, correctAnswer) {
        const result = document.getElementById('quiz-result');
        const resultText = document.getElementById('quiz-result-text');
        const correctAnswerEl = document.getElementById('quiz-correct-answer');
        const actions = document.getElementById('quiz-actions');
        
        result.classList.remove('correct', 'wrong', 'skipped');
        
        if (status === 'skipped') {
            result.classList.add('active', 'skipped');
            resultText.textContent = '答案';
            correctAnswerEl.innerHTML = `<span>${correctAnswer}</span>`;
            correctAnswerEl.style.display = 'block';
        } else {
            const isCorrect = status === true;
            result.classList.add('active', isCorrect ? 'correct' : 'wrong');
            resultText.textContent = isCorrect ? '正确!' : '错误';
            
            // 更新统计数据
            quizStats.total++;
            if (isCorrect) {
                quizStats.correct++;
            }
            saveQuizStats();
            updateStatsDisplay();
            
            if (!isCorrect) {
                correctAnswerEl.innerHTML = `正确答案: <span>${correctAnswer}</span>`;
                correctAnswerEl.style.display = 'block';
            } else {
                correctAnswerEl.style.display = 'none';
            }
        }
        
        actions.style.display = 'flex';
        document.getElementById('quiz-next-btn').focus({preventScroll:true});
    }

    // 数组随机排序
    function shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // ==================== Wallpaper 弹窗控制 ====================
    const wallpaperModal = document.getElementById('wallpaper-modal');
    const modalClose = document.getElementById('modal-close');
    const copyLinkBtn = document.getElementById('copy-link-btn');
    const workshopLink = 'https://steamcommunity.com/sharedfiles/filedetails/?id=3635766356';

    // 关闭弹窗
    modalClose.addEventListener('click', () => {
        wallpaperModal.close();
    });

    // 点击背景关闭
    wallpaperModal.addEventListener('click', (e) => {
        if (e.target === wallpaperModal) {
            wallpaperModal.close();
        }
    });

    // 复制链接
    copyLinkBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(workshopLink);
            copyLinkBtn.textContent = '✓ 已复制';
            copyLinkBtn.classList.add('copied');
            setTimeout(() => {
                copyLinkBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    复制链接
                `;
                copyLinkBtn.classList.remove('copied');
            }, 2000);
        } catch (err) {
            alert('复制失败，请手动复制链接');
        }
    });
