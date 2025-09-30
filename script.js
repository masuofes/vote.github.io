// 全体で使用する変数
let visitorData = [];
let totalVisitors = 0;
let votingData = [];
let projects = {
    high: [],
    middle: [],
    club: []
};
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
        // ローカルストレージから来場者数を取得（実際の実装では適切なデータソースから取得）
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
    
    // データをローカルストレージに保存（本来はサーバーサイドで処理）
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
        
        // データを時刻順に表示（最新が上）
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
    if (confirm('本当に来場者データをリセットしますか？この操作は元に戻せません。')) {
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
    loadProjects();
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
    
    currentVotes.push({ id: projectId, name: projectName });
    
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
    const statusElement = document.getElementById('voting-status');
    if (statusElement) {
        statusElement.style.display = 'block';
        statusElement.textContent = 'ご協力ありがとうございました！';
        
        setTimeout(() => {
            statusElement.style.display = 'none';
            currentVotes = [];
            updateVoteDisplay();
        }, 2000);
    }
    
    // 投票結果を保存
    localStorage.setItem('voteResults', JSON.stringify(voteResults));
}

// 投票取り消し
function undoVote() {
    if (currentVotes.length > 0 && currentVotes.length < 3) {
        const lastVote = currentVotes.pop();
        if (voteResults[lastVote.id]) {
            voteResults[lastVote.id].votes--;
            if (voteResults[lastVote.id].votes <= 0) {
                delete voteResults[lastVote.id];
            }
        }
        updateVoteDisplay();
        localStorage.setItem('voteResults', JSON.stringify(voteResults));
    }
}

// 投票作成ページの初期化
function initVotingCreatePage() {
    loadProjects();
    updateProjectsList();
    
    // フォーム送信
    const form = document.getElementById('project-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            addProject();
        });
    }
}

// プロジェクト追加
function addProject() {
    const name = document.getElementById('project-name').value;
    const imageUrl = document.getElementById('project-image').value;
    const category = document.getElementById('project-category').value;
    
    if (!name || !category) {
        alert('企画名とカテゴリーは必須です。');
        return;
    }
    
    if (!projects[category]) {
        projects[category] = [];
    }
    
    projects[category].push({
        name: name,
        imageUrl: imageUrl
    });
    
    // データを保存
    localStorage.setItem('projects', JSON.stringify(projects));
    
    // フォームをリセット
    document.getElementById('project-form').reset();
    
    // リストを更新
    updateProjectsList();
    
    showNotification('企画を追加しました');
}

// プロジェクトリストの更新
function updateProjectsList() {
    const tbody = document.getElementById('projects-list-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    let index = 1;
    
    Object.keys(projects).forEach(category => {
        projects[category].forEach((project, projectIndex) => {
            const row = tbody.insertRow();
            row.insertCell(0).textContent = index++;
            row.insertCell(1).textContent = project.name;
            row.insertCell(2).textContent = project.imageUrl || '（なし）';
            row.insertCell(3).textContent = getCategoryName(category);
            
            const actionsCell = row.insertCell(4);
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '削除';
            deleteBtn.className = 'btn-danger';
            deleteBtn.onclick = () => deleteProject(category, projectIndex);
            actionsCell.appendChild(deleteBtn);
        });
    });
}

// プロジェクト削除
function deleteProject(category, index) {
    if (confirm('この企画を削除しますか？')) {
        projects[category].splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
        updateProjectsList();
        showNotification('企画を削除しました');
    }
}

// カテゴリー名の取得
function getCategoryName(category) {
    const names = {
        'high': '高校企画',
        'middle': '中学企画',
        'club': '部活サークル企画'
    };
    return names[category] || category;
}

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

// 結果チャートの更新（簡易版）
function updateResultsChart() {
    const chartContainer = document.getElementById('results-chart');
    if (!chartContainer) return;
    
    chartContainer.innerHTML = '<h3>得票結果（上位5位）</h3>';
    
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
    if (confirm('本当に投票結果をリセットしますか？この操作は元に戻せません。')) {
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

// プロジェクトデータの読み込み
function loadProjects() {
    const saved = localStorage.getItem('projects');
    if (saved) {
        projects = JSON.parse(saved);
    } else {
        // デフォルトデータ
        projects = {
            high: [
                { name: '高校企画サンプル1', imageUrl: '' },
                { name: '高校企画サンプル2', imageUrl: '' }
            ],
            middle: [
                { name: '中学企画サンプル1', imageUrl: '' }
            ],
            club: [
                { name: '部活企画サンプル1', imageUrl: '' }
            ]
        };
    }
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

    btn.addEventListener("click", () => {
      if (frame.style.display === "none" || frame.style.display === "") {
        frame.style.display = "block";
        btn.textContent = "スプレッドシートを非表示";
      } else {
        frame.style.display = "none";
        btn.textContent = "スプレッドシートを表示";
      }
    });