fx_version 'cerulean'
game 'gta5'

author 'DARKNESS'
description 'Premium FiveM Loading Screen'
version '1.0.0'

-- UI Page
ui_page 'index.html'

-- Files to be loaded by the UI
files {
    'index.html',
    'css/style.css',
    'js/config.js',
    'js/app.js',
    -- Tambahkan asset lainnya di sini jika ada (video, music, images)
}

-- Client script
client_script 'client.lua'
