
// 全体で使用する変数
let visitorData = [];
let totalVisitors = 0;
let votingData = [];

// ========================================
// 修正: 投票選択肢の定義
// ここに企画を追加・編集してください
// ========================================
let projects = {
    high: [
        { 
            name: '監獄島からの大脱出〜君たちはどう脱出（いき）るか〜（1-1）',  // ←企画名をここに記入
            imageUrl: 'image/poster/high/1-1_pos.png'  // ←画像URLをここに記入（空文字''でも可）
        },
        { 
            name: '駄菓子屋 めぐみ（1-2）',  // ←企画名をここに記入
            imageUrl: 'image/poster/high/1-2_pos.png'  // ←画像URLをここに記入（空文字''でも可）
        },
        { 
            name: '氷貴族-KORIKIZOKU（1-3）',  // ←企画名をここに記入
            imageUrl: 'image/poster/high/1-3_pos.png'  // ←画像URLをここに記入（空文字''でも可）
        },
        { 
            name: '居眠りしてただけなのに（1-4）',  // ←企画名をここに記入
            imageUrl: 'image/poster/high/1-4_pos.png'  // ←画像URLをここに記入（空文字''でも可）
        },
        { 
            name: 'カジノ芝裏（1-5）',  // ←企画名をここに記入
            imageUrl: 'image/poster/high/1-5_pos.png'  // ←画像URLをここに記入（空文字''でも可）
        },
        { 
            name: 'ワ。ーワッフルの焼き加減についてー（1-6）',  // ←企画名をここに記入
            imageUrl: 'image/poster/high/1-6_pos.png'  // ←画像URLをここに記入（空文字''でも可）
        },
        { 
            name: 'Bar7（1-7）',  // ←企画名をここに記入
            imageUrl: 'image/poster/high/1-7_pos.png'  // ←画像URLをここに記入（空文字''でも可）
        },
        { 
            name: '和風カフェ（1-8）',  // ←企画名をここに記入
            imageUrl: 'image/poster/high/1-8_pos.png'  // ←画像URLをここに記入（空文字''でも可）
        },
        { 
            name: '恩田さんのハニーハント（2-1）',  // ←企画名をここに記入
            imageUrl: 'image/poster/high/2-1_pos.png'  // ←画像URLをここに記入（空文字''でも可）
        },
        { 
            name: 'カミナガ・ジョーンズ・アドベンチャー（2-2）',  // ←企画名をここに記入
            imageUrl: 'image/poster/high/2-2_pos.png'  // ←画像URLをここに記入（空文字''でも可）
        },
        { 
            name: '佐藤健ゴーストビレッジ（2-3）',  // ←企画名をここに記入
            imageUrl: 'image/poster/high/2-3_pos.png'  // ←画像URLをここに記入（空文字''でも可）
        },
        { 
            name: '海底2.4万マイル（2-4）',  // ←企画名をここに記入
            imageUrl: 'image/poster/high/2-4_pos.png'  // ←画像URLをここに記入（空文字''でも可）
        },
        { 
            name: 'たこせん本舗 竜宮城店（2-5）',  // ←企画名をここに記入
            imageUrl: 'image/poster/high/2-5_pos.png'  // ←画像URLをここに記入（空文字''でも可）
        },
        { 
            name: '塔の上のマツンツェル（2-6）',  // ←企画名をここに記入
            imageUrl: 'image/poster/high/2-6_pos.png'  // ←画像URLをここに記入（空文字''でも可）
        },
        { 
            name: 'スクールウォーズ　〜生徒の逆襲〜（2-7）',  // ←企画名をここに記入
            imageUrl: 'image/poster/high/2-7_pos.png'  // ←画像URLをここに記入（空文字''でも可）
        },
        { 
            name: 'ヤッホークロッフル（高3有志）',  // ←企画名をここに記入
            imageUrl: 'image/poster/high/3-cruffle_pos.png'  // ←画像URLをここに記入（空文字''でも可）
        }
        // ↑ここに高校企画を追加する場合は、カンマで区切って上記の形式で追加してください
    ],
    middle: [
        { 
            name: '中学１年生 音楽発表（1-A）', 
            imageUrl: 'image/poster/junior-high/1-A_pos.png' 
        },
        { 
            name: 'SIT環境ミュージアム（1-B）', 
            imageUrl: 'image/poster/junior-high/1-B_pos.png' 
        },
        { 
            name: '中学1年ワークショップ（1-C）', 
            imageUrl: 'image/poster/junior-high/1-C_pos.png' 
        },
        { 
            name: '１−D○×クイズめぐり！（1-D）', 
            imageUrl: 'image/poster/junior-high/1-D_pos.png' 
        },
        { 
            name: '中学１年研究展示（1-E）', 
            imageUrl: 'image/poster/junior-high/1-E_pos.png' 
        },
        { 
            name: 'もっくん（2-A）', 
            imageUrl: 'image/poster/junior-high/2-A_pos.png' 
        },
        { 
            name: 'ワークショップ・トーハク（2-B）', 
            imageUrl: 'image/poster/junior-high/2-B_pos.png' 
        },
        { 
            name: '演劇チーム七井（2-C）', 
            imageUrl: 'image/poster/junior-high/2-C_pos.png' 
        },
        { 
            name: '演劇チーム矢野（2-D）', 
            imageUrl: 'image/poster/junior-high/2-D_pos.png' 
        },
        { 
            name: '日本文化プレゼンラボ（2-E）', 
            imageUrl: 'image/poster/junior-high/2-E_pos.png' 
        },
        { 
            name: 'ジオラマ（コモンスペース）', 
            imageUrl: 'image/poster/junior-high/2-F-common_pos.png' 
        },
        { 
            name: '迷宮迷走なう（3-A）', 
            imageUrl: 'image/poster/junior-high/3-A_pos.png' 
        },
        { 
            name: 'SHIBAKASHI SECRET FILE〜キミだけが知る学校の裏側〜（3-B）',
            imageUrl: 'image/poster/junior-high/3-B_pos.png' 
        },
        { 
            name: 'CanderLand〜ムラマッチョをそえて〜（3-C）', 
            imageUrl: 'image/poster/junior-high/3-C_pos.png' 
        },
        { 
            name: 'キウィたちはどう生きるか in New Zealand（3-D）', 
            imageUrl: 'image/poster/junior-high/3-D_pos.png' 
        },
        { 
            name: 'シバカシ呪霊界隈（3-E）', 
            imageUrl: 'image/poster/junior-high/3-E_pos.png' 
        }
        // ↑ここに中学企画を追加する場合は、カンマで区切って上記の形式で追加してください
    ],
    club: [
        { 
            name: '古とのは～カードゲームで遊ぼう～（アントレプレナーシップ）', 
            imageUrl: 'image/poster/club/club_entrepreneurship_pos.png' 
        },
        { 
            name: 'この一手、君に届けー心をつなぐ盤上の物語ー（中高囲碁将棋部）', 
            imageUrl: 'image/poster/club/shogi_pos.png' 
        },
        { 
            name: 'ナシ太郎と愉快な七つの大罪たち（中学演劇部）', 
            imageUrl: 'image/poster/club/club_juniorhigh_drama_pos.png' 
        },
        { 
            name: '高校演劇部（高校演劇部）', 
            imageUrl: 'image/poster/club/club_high_drama.png' 
        },
        { 
            name: '中高科学部（中高科学部）', 
            imageUrl: 'image/poster/club/club_high_scienece_pos.png' 
        },
        { 
            name: '弓道体験（高校弓道部）', 
            imageUrl: 'image/poster/club/club_bow_pos.png' 
        },
        { 
            name: 'シバカシの謎を追え（クイズ研究サークル）', 
            imageUrl: 'image/poster/club/club_quiz_pos.png' 
        },
        { 
            name: 'Rook in Sibakashi（軽音楽部）', 
            imageUrl: 'image/poster/club/club_lock_pos.png' 
        },
        { 
            name: 'コン部Lab（中学コンピューター部）', 
            imageUrl: 'image/poster/club/club_juniorhigh_computer_pos.png' 
        },
        { 
            name: 'コン部なう（高校コンピューター部）', 
            imageUrl: 'image/poster/club/club_high_computer_pos.png' 
        },
        { 
            name: '御茶処-雅-（茶道部）', 
            imageUrl: 'image/poster/club/club_tea_pos.png' 
        },
        { 
            name: '外部試合（高校水泳部）', 
            imageUrl: 'image/poster/club/club_waterpolo_pos.png' 
        },
        { 
            name: '芝吹 Wind Airline 〜音楽で送る世界一周旅行〜（中高吹奏楽部）', 
            imageUrl: 'image/poster/club/club_music_pos.png' 
        },
        { 
            name: '君の知らない数学（中高数学研究サークル）', 
            imageUrl: 'image/poster/club/club_math_pos.png' 
        },
        { 
            name: '芝柏ダンス部（中高ダンス部）', 
            imageUrl: 'image/poster/club/club_high_dance.png' 
        },
        { 
            name: '中高鉄道研究部（中高鉄道研究部）', 
            imageUrl: 'image/poster/club/club_train_pos.png' 
        },
        { 
            name: '跳べ！狙え！シュートチャレンジ！（中高ハンドボール部）', 
            imageUrl: 'image/poster/club/club_handball_pos.png' 
        },
        { 
            name: 'クラゲのキーホルダー作り（高校美術部）', 
            imageUrl: 'image/poster/club/club_art_pos.png' 
        },
        { 
            name: '楽書村（中高文芸部）', 
            imageUrl: 'image/poster/club/club_bunngei_pos.png' 
        },
        { 
            name: 'スピードガンコンテストwithアイス販売（高校野球部）', 
            imageUrl: 'image/poster/club/club_baseball_pos.png' 
        }
        // ↑ここに部活サークル企画を追加する場合は、カンマで区切って上記の形式で追加してください
    ]
};
// ========================================

let currentVotes = [];
let voteResults = {};

// DOM読み込み完了時の処理
document.addEventListener('DOMContentLoaded', function() {
    // モバイルメニューの処理
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            if (mobileMenu.style.display === 'block') {
                mobileMenu.style.display = 'none';
            } else {
                mobileMenu.style.display = 'block';
            }
        });
    }

    // ページ別の初期化
    const currentPage = document.body.className;
    
    switch(currentPage) {
        case 'home-page':
            initHomePage();
            break;
        case 'reception-page':
            initReceptionPage();
            break;
        case 'visitor-count-page':
            initVisitorCountPage();
            break;
        case 'voting-page':
            initVotingPage();
            break;
        case 'voting-result-page':
            initVotingResultPage();
            break;
        case 'voting-create-page':
            // 修正: 投票作成ページは無効化
            initVotingCreatePage();
            break;
    }
});

// ホームページの初期化
function initHomePage() {
    updateDateTime();
    updateCountdown();
    updateVisitorCount();
    
    // 1分ごとに更新
    setInterval(function() {
        updateDateTime();
        updateCountdown();
        updateVisitorCount();
    }, 60000);
}

// 日時の更新
function updateDateTime() {
    const now = new Date();
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = formatDateTime(now);
    }
}

// 日時フォーマット
function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}/${month}/${day} ${hours}:${minutes}`;
}

// カウントダウンの更新
function updateCountdown() {
    const now = new Date();
    const year = now.getFullYear();
    
    // イベント期間の設定
    const day1Start = new Date(year, 9, 4, 11, 0); // 10/4 11:00
    const day1End = new Date(year, 9, 4, 16, 0);   // 10/4 16:00
    const day2Start = new Date(year, 9, 5, 10, 0); // 10/5 10:00
    const day2End = new Date(year, 9, 5, 15, 0);   // 10/5 15:00
    
    let targetDate, message;
    
    if (now < day1Start) {
        targetDate = day1Start;
        message = "開催まで残り";
    } else if (now >= day1Start && now < day1End) {
        targetDate = day1End;
        message = "一日目終了まで残り";
    } else if (now >= day1End && now < day2Start) {
        targetDate = day2Start;
        message = "二日目開始まで残り";
    } else if (now >= day2Start && now < day2End) {
        targetDate = day2End;
        message = "増穂祭終了まで残り";
    } else {
        // 来年のイベント
        targetDate = new Date(year + 1, 9, 4, 11, 0);
        message = "開催まで残り";
    }
    
    const diff = targetDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        countdownElement.textContent = `${message}${String(days).padStart(2, '0')}d${String(hours).padStart(2, '0')}h${String(minutes).padStart(2, '0')}m`;
    }
}

// 来場者数の更新
function updateVisitorCount() {
    const visitorCountElement = document.getElementById('visitor-count-display');
    if (visitorCountElement) {
        // ローカルストレージから来場者数を取得(実際の実装では適切なデータソースから取得)
        const total = getTotalVisitors();
        visitorCountElement.textContent = `現在の来場者数: ${total}人`;
    }
}

// 受付ページの初期化
function initReceptionPage() {
    // 来場者数ボタンのイベントリスナー
    const visitorButtons = document.querySelectorAll('.visitor-btn, .visitor-btn-small');
    visitorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const count = parseInt(this.dataset.count);
            recordVisitor(count);
        });
    });
}

// 来場者の記録
function recordVisitor(count) {
    const now = new Date();
    const timestamp = formatDateTime(now);
    
    const visitorEntry = {
        timestamp: timestamp,
        count: count
    };
    
    visitorData.push(visitorEntry);
    totalVisitors += count;
    
    // データをローカルストレージに保存(本来はサーバーサイドで処理)
    localStorage.setItem('visitorData', JSON.stringify(visitorData));
    localStorage.setItem('totalVisitors', totalVisitors.toString());
    
    // 視覚的フィードバック
    showNotification(`${count}人を記録しました`);
}

// 来場者数ページの初期化
function initVisitorCountPage() {
    loadVisitorData();
    updateVisitorCountDisplay();
    updateVisitorTable();
    
    // リセットボタン
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetVisitorData);
    }
    
    // ダウンロードボタン
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadVisitorData);
    }
}

// 来場者データの読み込み
function loadVisitorData() {
    const savedData = localStorage.getItem('visitorData');
    const savedTotal = localStorage.getItem('totalVisitors');
    
    if (savedData) {
        visitorData = JSON.parse(savedData);
    }
    if (savedTotal) {
        totalVisitors = parseInt(savedTotal);
    }
}

// 来場者数表示の更新
function updateVisitorCountDisplay() {
    const totalElement = document.getElementById('total-visitors');
    if (totalElement) {
        totalElement.textContent = totalVisitors;
    }
}

// 来場者テーブルの更新
function updateVisitorTable() {
    const tableBody = document.getElementById('visitor-table-body');
    if (tableBody) {
        tableBody.innerHTML = '';
        
        // データを時刻順に表示(最新が上)
        const sortedData = [...visitorData].reverse();
        
        sortedData.forEach(entry => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = entry.timestamp;
            row.insertCell(1).textContent = entry.count;
        });
    }
}

// 来場者データのリセット
function resetVisitorData() {
    if (confirm('本当に来場者データをリセットしますか?この操作は元に戻せません。')) {
        visitorData = [];
        totalVisitors = 0;
        localStorage.removeItem('visitorData');
        localStorage.removeItem('totalVisitors');
        
        updateVisitorCountDisplay();
        updateVisitorTable();
        showNotification('データをリセットしました');
    }
}

// 来場者データのダウンロード
function downloadVisitorData() {
    let csvContent = "タイムスタンプ,人数\n";
    
    visitorData.forEach(entry => {
        csvContent += `${entry.timestamp},${entry.count}\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'visitor_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 投票ページの初期化
function initVotingPage() {
    // 修正: loadProjects()は不要（projectsは既に定義済み）
    currentVotes = [];
    
    // タブの初期化
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.category);
        });
    });
    
    // 初期タブを表示
    switchTab('high');
    updateVoteDisplay();
}

// タブの切り替え
function switchTab(category) {
    // タブボタンのアクティブ状態更新
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // 投票グリッドの更新
    updateVotingGrid(category);
    
    // 現在の選択状態を復元
    currentVotes.forEach(vote => {
        const selectedElement = document.querySelector(`[data-project-id="${vote.id}"]`);
        if (selectedElement) {
            selectedElement.classList.add('vote-selected');
        }
    });
}

// 投票グリッドの更新
function updateVotingGrid(category) {
    const grid = document.getElementById('voting-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const categoryProjects = projects[category] || [];
    
    categoryProjects.forEach((project, index) => {
        const item = document.createElement('div');
        item.className = 'vote-item';
        item.dataset.projectId = `${category}-${index}`;
        
        item.innerHTML = `
            ${project.imageUrl ? `<img src="${project.imageUrl}" alt="${project.name}">` : '<div style="height:120px;background:#ddd;border-radius:10px;margin-bottom:15px;"></div>'}
            <h3>${project.name}</h3>
        `;
        
        item.addEventListener('click', function() {
            vote(this.dataset.projectId, project.name);
        });
        
        grid.appendChild(item);
    });
}

// 投票処理
function vote(projectId, projectName) {
    if (currentVotes.length >= 3) return;
    
    // 既に選択済みか確認
    const alreadyVoted = currentVotes.some(vote => vote.id === projectId);
    if (alreadyVoted) return;
    
    currentVotes.push({ id: projectId, name: projectName });
    
    // 選択された要素に視覚的フィードバックを追加
    const selectedElement = document.querySelector(`[data-project-id="${projectId}"]`);
    if (selectedElement) {
        selectedElement.classList.add('vote-selected');
    }
    
    // 投票結果に記録
    if (!voteResults[projectId]) {
        voteResults[projectId] = { name: projectName, votes: 0 };
    }
    voteResults[projectId].votes++;
    
    updateVoteDisplay();
    
    if (currentVotes.length === 3) {
        completeVoting();
    }
}

// 投票表示の更新
function updateVoteDisplay() {
    const display = document.getElementById('vote-count-display');
    if (display) {
        display.textContent = `投票済み: ${currentVotes.length}/3`;
    }
}

// 投票完了処理
function completeVoting() {
    // 投票結果を保存
    localStorage.setItem('voteResults', JSON.stringify(voteResults));
    
    // 完了メッセージを表示
    const statusElement = document.getElementById('voting-status');
    if (statusElement) {
        statusElement.style.display = 'block';
        statusElement.textContent = 'ご協力ありがとうございました!';
    }
    
    // DOMの更新を待ってから選択状態をクリア
    setTimeout(() => {
        document.querySelectorAll('.vote-selected').forEach(el => {
            el.classList.remove('vote-selected');
        });
        currentVotes = [];
        updateVoteDisplay();
    }, 100);
    
    // 完了メッセージを非表示
    setTimeout(() => {
        if (statusElement) {
            statusElement.style.display = 'none';
        }
    }, 2000);
}

// 投票取り消し
function undoVote() {
    // 0票または3票完了時は取り消せない
    if (currentVotes.length === 0 || currentVotes.length >= 3) {
        return;
    }
    
    const lastVote = currentVotes.pop();
    
    // 選択状態を解除
    const selectedElement = document.querySelector(`[data-project-id="${lastVote.id}"]`);
    if (selectedElement) {
        selectedElement.classList.remove('vote-selected');
    }
    
    // 投票結果から削除
    if (voteResults[lastVote.id]) {
        voteResults[lastVote.id].votes--;
        if (voteResults[lastVote.id].votes <= 0) {
            delete voteResults[lastVote.id];
        }
    }
    
    updateVoteDisplay();
    localStorage.setItem('voteResults', JSON.stringify(voteResults));
    showNotification('投票を取り消しました');
}

// 修正: 投票作成ページの初期化（機能を無効化）
function initVotingCreatePage() {
    // 機能無効化メッセージを表示
    const container = document.querySelector('.voting-admin .container');
    if (container) {
        container.innerHTML = `
            <h1 style="text-align: center; color: #8e44ad; margin: 40px 0; font-size: 2.5em;">投票作成</h1>
            <div class="admin-form">
                <h2 style="color: #e74c3c; margin-bottom: 20px; text-align: center;">この機能は無効化されました</h2>
                <p style="text-align: center; font-size: 18px; line-height: 1.8;">
                    投票選択肢の追加・編集は、script.jsファイル内で直接行ってください。<br>
                    詳しくはコード内のコメントを参照してください。
                </p>
            </div>
        `;
    }
}

// 修正: 以下の関数は使用されなくなったため削除またはコメントアウト
/*
function addProject() { ... }
function updateProjectsList() { ... }
function deleteProject(category, index) { ... }
function getCategoryName(category) { ... }
*/

// 投票結果ページの初期化
function initVotingResultPage() {
    loadVoteResults();
    updateResultsDisplay();
    
    // リセットボタン
    const resetBtn = document.getElementById('reset-votes-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetVoteResults);
    }
    
    // ダウンロードボタン
    const downloadBtn = document.getElementById('download-results-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadVoteResults);
    }
}

// 投票結果の読み込み
function loadVoteResults() {
    const saved = localStorage.getItem('voteResults');
    if (saved) {
        voteResults = JSON.parse(saved);
    }
}

// 結果表示の更新
function updateResultsDisplay() {
    updateResultsTable();
    updateResultsChart();
}

// 結果テーブルの更新
function updateResultsTable() {
    const tbody = document.getElementById('results-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // 得票数順にソート
    const sortedResults = Object.entries(voteResults).sort((a, b) => b[1].votes - a[1].votes);
    
    sortedResults.forEach(([id, data], index) => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = data.name;
        row.insertCell(2).textContent = data.votes;
    });
}

// 結果チャートの更新(簡易版)
function updateResultsChart() {
    const chartContainer = document.getElementById('results-chart');
    if (!chartContainer) return;
    
    chartContainer.innerHTML = '<h3>得票結果(上位5位)</h3>';
    
    const sortedResults = Object.entries(voteResults).sort((a, b) => b[1].votes - a[1].votes).slice(0, 5);
    const maxVotes = sortedResults.length > 0 ? sortedResults[0][1].votes : 1;
    
    sortedResults.forEach(([id, data]) => {
        const barContainer = document.createElement('div');
        barContainer.style.cssText = 'margin: 10px 0; display: flex; align-items: center;';
        
        const label = document.createElement('span');
        label.textContent = data.name;
        label.style.cssText = 'width: 200px; margin-right: 10px; font-size: 14px;';
        
        const bar = document.createElement('div');
        bar.style.cssText = `height: 20px; background: #8e44ad; width: ${(data.votes / maxVotes) * 300}px; margin-right: 10px;`;
        
        const votes = document.createElement('span');
        votes.textContent = `${data.votes}票`;
        votes.style.cssText = 'font-weight: bold;';
        
        barContainer.appendChild(label);
        barContainer.appendChild(bar);
        barContainer.appendChild(votes);
        chartContainer.appendChild(barContainer);
    });
}

// 投票結果のリセット
function resetVoteResults() {
    if (confirm('本当に投票結果をリセットしますか?この操作は元に戻せません。')) {
        voteResults = {};
        localStorage.removeItem('voteResults');
        updateResultsDisplay();
        showNotification('投票結果をリセットしました');
    }
}

// 投票結果のダウンロード
function downloadVoteResults() {
    let csvContent = "順位,企画名,得票数\n";
    
    const sortedResults = Object.entries(voteResults).sort((a, b) => b[1].votes - a[1].votes);
    
    sortedResults.forEach(([id, data], index) => {
        csvContent += `${index + 1},${data.name},${data.votes}\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'vote_results.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 修正: プロジェクトデータの読み込み（localStorageから読み込まない）
function loadProjects() {
    // projectsは既にコード内で定義されているため、何もしない
    // デフォルトデータの設定も不要
}

// 総来場者数の取得
function getTotalVisitors() {
    const saved = localStorage.getItem('totalVisitors');
    return saved ? parseInt(saved) : 0;
}

// 通知表示
function showNotification(message) {
    // 簡易通知システム
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

const btn = document.getElementById("toggleButton");
const frame = document.getElementById("sheetFrame");

if (btn && frame) {
    btn.addEventListener("click", () => {
      if (frame.style.display === "none" || frame.style.display === "") {
        frame.style.display = "block";
        btn.textContent = "スプレッドシートを非表示";
      } else {
        frame.style.display = "none";
        btn.textContent = "スプレッドシートを表示";
      }
    });
}