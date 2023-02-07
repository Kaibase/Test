window.onload = function() {

    // 初期化
    function setup() {
        var puzzle = ['', '1', '2', '3', '4', '5', '6', '7', '8','9','10','11','12','13','14','15']
        shuffle(puzzle);
        // 配列をコピーし、そのコピーされた配列で関数に代入
        if(solve(puzzle.slice(0, puzzle.length))) {
        make(puzzle);
        }else {
            setup();
        }
    }

    // パズルシャッフル
    function shuffle(puzzle) {
        var i = puzzle.length;
        while(i) {
                    // 切捨整数化、0～1の乱数生成
            var j = Math.floor(Math.random() * i--);
            swap(i, j, puzzle);
        }
    }

    // 配列入れ替え
    function swap(i, j, puzzle) {
        var tmp = puzzle[i];
        puzzle[i] = puzzle[j];
        puzzle[j] = tmp;
    }

    // 解決可能なパズルかを判定する関数
    function solve(puzzle) {
        // 配列の空白位置と答えの空白位置の距離を調べる
        // 配列内の空白の要素番号を格納
        var null_box = puzzle.indexOf('');                       // arr.lengthの平方根を返す(=4)
        vertical = Math.floor(((puzzle.length - 1) - null_box) / Math.sqrt(puzzle.length));
        horizontal = ((puzzle.length - 1) - null_box) % Math.sqrt(puzzle.length);
        var distance = vertical + horizontal;

        // 答えの配列と同じになるように、代入された配列を入れ替える
        answer = ['1', '2', '3', '4', '5', '6', '7', '8','9','10','11','12','13','14','15', ''];
        var count = 0;
        for (var i = 0; i < answer.length; i++) {
            for (var j = i + 1; j < answer.length; j++) {
                if(i + 1 == puzzle[j]) { 
                    swap(i, j, puzzle);
                    count++;
                }
            }
            // 答えの配列と同じになったかどうかを判定
            if(puzzle.toString() === answer.toString()) {
                break;
            }
        }

        // 上記二つの偶奇を調べる
        if(count % 2 === distance % 2) {
            return true;
        }else {
            return false;
        }
    }

    // パズル生成(?????)
    function make(puzzle) {
        var $Panel = document.getElementById('js-show-panel');
        // すでにあるパズルを一旦削除
        while($Panel.firstChild) {
            $Panel.removeChild($Panel.firstChild);
        }

        // フラグメント生成
        fragment = document.createDocumentFragment();
        // パズルHTML生成
        puzzle.forEach(function(element) {   
            var tileWrapper = document.createElement('div');
            tileWrapper.className = 'tile-wrapper';

            var tile = document.createElement('div');
            tile.className = element != '' ? 'tile tile-' + element : 'tile tile-none';
            tile.textContent = element;

            tileWrapper.appendChild(tile);
            fragment.appendChild(tileWrapper);
        });
        // パズル生成
        $Panel.appendChild(fragment);
        // クリック動作
        addEventListenerClick(puzzle);
    }

    // クリック動作
    function addEventListenerClick(puzzle) {
        // クラス名にtileがつく全てのDOMにクリックイベント追加し、ひとつひとつにfunction(elem)を適用
        $tile = document.querySelectorAll('.tile');
        $tile.forEach(function(elem) {
            elem.addEventListener('click', function() {
                // クリックした箱と、移送先の箱の要素番号をそれぞれの変数に代入
                var i =  puzzle.indexOf(this.textContent);
                var j;
                // 下移動
                if(i <= 11 && puzzle[i + 4] == '') {
                    j = i + 4;
                }
                // 上移動
                else if(i >= 4 && puzzle[i - 4] == '') {
                    j = i - 4;
                }
                // 右移動
                else if(i % 4 != 3 && puzzle[i + 1] == '') {
                    j = i + 1;
                // 左移動
                }else if(i % 4 != 0 && puzzle[i - 1] == '') {
                    j = i - 1;
                }
                // 変化なし
                else {
                    return;
                }
                // パズル移動
                swap(i, j, puzzle);
                // パズル再生成
                make(puzzle);
            });
        });
    }

    // 主な処理
    setup();
    // リセット
    document.getElementById('js-reset-puzzle').addEventListener('click', function() {
        setup();
    });
}