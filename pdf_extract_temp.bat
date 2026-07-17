@echo off
certutil -dump "d:\VS CODE projects\fixtop\pdf\FIXTOP TRADING PLC COMPANY PROFILE_2.pdf" | findstr /i "Address address PLC Fixtop Trading Ethiopia Addis P.O. PO Tel Phone Fax Email www @" > "%TEMP%\fixtop_pdf_search.txt"
if %errorlevel% equ 0 (
  type "%TEMP%\fixtop_pdf_search.txt"
) else (
  echo NO_MATCH_FOUND
)
