$path = 'd:\VS CODE projects\fixtop\pdf\FIXTOP TRADING PLC COMPANY PROFILE_2.pdf'
$bytes = [System.IO.File]::ReadAllBytes($path)
$text = [System.Text.Encoding]::ASCII.GetString($bytes)
$patterns = 'Address|address|PLC|Fixtop|Trading|Ethiopia|Addis|P\.O\.|PO|Tel|Phone|Fax|Email|www|@'
$text -split '[\r\n]+' | Select-String -Pattern $patterns | Select-Object -First 200 | ForEach-Object { $_.Line }
