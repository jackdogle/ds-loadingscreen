-- client.lua - Logic untuk Loading Screen DARKNESS
-- Senior Full-Stack FiveM Developer

local isLoaded = false

-- Handler saat loading screen selesai (dipanggil dari NUI)
RegisterNUICallback('enter_server', function(data, cb)
    -- Tutup UI
    ShutdownLoadingScreenNui()
    
    -- Efek transisi halus
    DoScreenFadeOut(500)
    Wait(500)
    
    -- Memberikan sinyal ke server/logic lain bahwa loading selesai
    isLoaded = true
    
    -- Efek transisi masuk ke game
    Wait(1000)
    DoScreenFadeIn(1000)
    
    cb('ok')
end)

-- Optimasi: Memastikan NUI ditutup jika terjadi timeout (safety)
CreateThread(function()
    while not isLoaded do
        Wait(5000)
        -- Kamu bisa menambahkan logika timeout di sini jika loading bar macet
    end
end)

-- Contoh event saat player spawn
AddEventHandler('playerSpawned', function()
    -- Pastikan loading screen ditutup jika belum tertutup
    if not isLoaded then
        -- ShutdownLoadingScreenNui() -- Opsional, biasanya di-handle enter_server
    end
end)
