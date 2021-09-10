'===========================================================
'Function to Create a Random Number with DateTime Stamp
'===========================================================
Function CurrentDate()

'Find out the current date and time
Dim sDate : sDate = Day(Now)
Dim sMonth : sMonth = Month(Now)
Dim sYear : sYear = Year(Now)

'Create Random Number
If sMonth < 10 Then
	sMonth = "0" & sMonth
End If
If sDate < 10 Then
	sDate = "0" & sDate
End If
CurrentDate = sMonth & "/" & sDate & "/" & sYear

'======================== End Function =====================
End Function

Function AIWaitForExist (Object)
	Dim counter
	
	counter = 1
	Do
		wait(1)
		counter = counter + 1
		If counter > 15 Then
			Reporter.ReportEvent micFail, "AIWaitForExist" & Object, "Object didn't show up within " & counter & " attempts."
			Exit Do
		End If
	Loop Until Object.Exist(0)	
End Function

Function SelectCard (Card)

	'===========================================================================================
	'BP:  To customize the cards on the overview page, choose the User Icon and choose Manage Cards.
	'===========================================================================================
	AIUtil("profile").Click
	AIUtil.FindTextBlock("Manage Cards").Click

	'===========================================================================================
	'BP:  Set your preferences and choose OK.
	'===========================================================================================
	AIUtil("toggle_button", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock(Card)).SetState "On"
	AIUtil("toggle_button", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock(Card)).CheckState "On"
	'For i = 1 To 8 Step 1
	'	AIUtil("toggle_button", micAnyText, micFromTop,i).SetState "On"
	'	AIUtil("toggle_button", micAnyText, micFromTop,i).CheckState "On"
	'Next
	'AIUtil("toggle_button", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("Recognized Cost of Sales", micFromTop, 1)).SetState "On"
	'AIUtil("toggle_button", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("Recognized Cost of Sales", micFromTop, 1)).CheckState "On"
	'AIUtil("toggle_button", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("Journal Entries to Be Verified")).SetState "On"
	'AIUtil("toggle_button", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("Journal Entries to Be Verified")).CheckState "On"
	'AIUtil("toggle_button", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("My Inbox")).SetState "On"
	'AIUtil("toggle_button", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("My Inbox")).CheckState "On"
	'AIUtil("toggle_button", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("Tax Reconciliation Account Balance")).SetState "On"
	'AIUtil("toggle_button", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("Tax Reconciliation Account Balance")).CheckState "On"
	'AIUtil("toggle_button", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("Recognized Revenue", micFromTop, 1)).SetState "On"
	'AIUtil("toggle_button", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("Recognized Revenue", micFromTop, 1)).CheckState "On"
	'AIUtil("toggle_button", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("Days Sales Outstanding")).SetState "On"
	'AIUtil("toggle_button", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("Days Sales Outstanding")).CheckState "On"
	'AIUtil("toggle_button", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("Days Payable Outstanding Indirect")).SetState "On"
	'AIUtil("toggle_button", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("Days Payable Outstanding Indirect")).CheckState "On"
	'AIUtil("toggle_button", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("G/L Item Changes")).SetState "On"
	'AIUtil("toggle_button", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("G/L Item Changes")).CheckState "On"
	AIUtil("button", "OK").Click
	
End Function

Function DeselectCard (Card)

	'===========================================================================================
	'BP:  To customize the cards on the overview page, choose the User Icon and choose Manage Cards.
	'===========================================================================================
	AIUtil("profile").Click
	AIUtil.FindTextBlock("Manage Cards").Click

	'===========================================================================================
	'BP:  Set your preferences and choose OK.
	'===========================================================================================
	'AIUtil("toggle_button", micAnyText, micWithAnchorOnLeft, AIUtil.FindText(Card)).SetState "Off"
	AIUtil("toggle_button", micAnyText, micWithAnchorOnLeft, AIUtil.FindText(Card, micFromRight, 1)).SetState "Off"	
	AIUtil("toggle_button", micAnyText, micWithAnchorOnLeft, AIUtil.FindText(Card, micFromRight, 1)).CheckState "Off"
	AIUtil("button", "OK").Click
	
End Function

Dim BrowserExecutable, rc, oShell

Set oShell = CreateObject ("WSCript.shell")
oShell.run "powershell -command ""Start-Service mediaserver"""
Set oShell = Nothing

While Browser("CreationTime:=0").Exist(0)   													'Loop to close all open browsers
	Browser("CreationTime:=0").Close 
Wend
BrowserExecutable = DataTable.Value("BrowserName") & ".exe"
SystemUtil.Run BrowserExecutable,"","","",3												'launch the browser specified in the data table
Set AppContext=Browser("CreationTime:=0")												'Set the variable for what application (in this case the browser) we are acting upon

AppContext.ClearCache																		'Clear the browser cache to ensure you're getting the latest forms from the application
AppContext.Navigate DataTable.Value("URL")												'Navigate to the application URL
AppContext.Maximize																		'Maximize the application to give the best chance that the fields will be visible on the screen
AppContext.Sync																			'Wait for the browser to stop spinning
AIUtil.SetContext AppContext																'Tell the AI engine to point at the application

'===========================================================================================
'BP:  Open the Fiori Launchpad.
'		User: S4H_FIN_DEM, Password: Welcome1
'		Set Default Value for SAP Fiori Launchpad User Settings (Optional).
'		On the SAP Fiori launchpad, go to User > Settings > Default Values.
'===========================================================================================
Set Object = AIUtil("text_box", "User")
AIWaitForExist Object
AIUtil("text_box", "User").Type DataTable.Value("Username")
AIUtil("text_box", "Password").Type DataTable.Value("Password")
AIUtil("button", "Log On").Click
AppContext.Sync
Set Object = AIUtil("profile")
AIWaitForExist Object
AIUtil("profile").Click
Set Object = AIUtil("gear_settings")
AIWaitForExist Object
AIUtil("gear_settings").Click
AIUtil.FindTextBlock("Appearance").Click
if (AIUtil.FindTextBlock("SAP Belize", micFromBottom, 1).Exist(0)) Then
	AIUtil.FindTextBlock("SAP Belize", micFromBottom, 1).Click
else
	AIUtil.FindTextBlock("SAP Belize").Click
End If

'===========================================================================================
'BP:  The following input fields are available:
'		Display Currency
'		Fin. Statement Vers.
'		Ledger
'		Company Code
'		Planning Category
'		You can enter and save default values.
'===========================================================================================
AIUtil.FindTextBlock("Default Values").Click
AppContext.Sync
Browser("Home").Page("Home").WebEdit("Plan Category").Check CheckPoint("Plan Category") @@ script infofile_;_ZIP::ssf6.xml_;_
Browser("Home").Page("Home").WebEdit("Company Code").Check CheckPoint("Company Code") @@ script infofile_;_ZIP::ssf4.xml_;_
Browser("Home").Page("Home").WebEdit("Fin. Statement Vers.").Check CheckPoint("Fin. Statement Vers.") @@ script infofile_;_ZIP::ssf5.xml_;_
Browser("Home").Page("Home").WebEdit("Ledger").Check CheckPoint("Ledger") @@ script infofile_;_ZIP::ssf3.xml_;_
Browser("Home").Page("Home").WebEdit("Display Currency").Check CheckPoint("Display Currency") @@ script infofile_;_ZIP::ssf2.xml_;_
AIUtil("button", "Save").Click

'===========================================================================================
'BP:  Open the General Ledger Overview app.
'		Note – for users with many roles assigned, it may be faster to find an app by searching for it by entering its name in the field.
'===========================================================================================
AIUtil("search").Search "General Ledger Overview"
AIUtil("search").Click

'===========================================================================================
'BP:  Make the following entries on the filter bar and choose Go:
'		Display Currency: USD
'		Key Date: <current date>
'		Planning Category: <PLN>
'		Statement Version: <YCOA>
'		Ledger: <0L>
'		Company Code: <1710>
'===========================================================================================
Set Object = AIUtil.FindText("General Ledger Overview")
AIWaitForExist Object
If AIUtil.FindText("Filtered By").Exist(0) Then
	AIUtil("down_triangle", micAnyText, micFromTop, 3).Click
End If

'AIUtil("text_box", "Display Currency: *").Type "USD"
Browser("Home").Page("Home").WebEdit("Display Currency_2").Set "USD"
'AIUtil("text_box", "Key Date: *").Type CurrentDate
Browser("Home").Page("Home").WebEdit("Key Date").Set CurrentDate
'AIUtil("text_box", "Planning Category: *").Type "PLN"
Browser("Home").Page("Home").WebEdit("Planning Category").Set "PLN"
'AIUtil("text_box", "Statement Version: *").Type "YCOA"
Browser("Home").Page("Home").WebEdit("Statement Version").Set "YCOA"
'AIUtil("text_box", "Ledger: *").Type "0L"
Browser("Home").Page("Home").WebEdit("Ledger_2").Set "0L"
'AIUtil("text_box", "Company Code:*").Type "1710"
Browser("Home").Page("Home").WebEdit("Company Code_2").Set "1710"
AIUtil("button", "Go").Click

'===========================================================================================
'BP:  Navigate to Journal Entries to be Verified.
'		Choose the header (or line point) of the card to get further information.
'===========================================================================================
SelectCard "Journal Entries to Be Verified"
AIUtil.FindText("Journal Entries to Be Verified").Click
Browser("Home").Page("Home").WebTable("Status").Check CheckPoint("Status") @@ script infofile_;_ZIP::ssf7.xml_;_
AIUtil("left_triangle").Click
DeselectCard "Journal Entries to Be Verified"

'===========================================================================================
'BP:  Navigate to G/L Account Balance.
'		Choose the header (or line point) of the card to get further information.
'===========================================================================================
SelectCard "G/L Account Balance"
AIUtil.FindText("G/L Account Balance").Click
AIUtil.FindText("Balance Sheet/Income Statement").CheckExists True

'===========================================================================================
'BP:  If you click on a line item, you are directly navigated to the selected account group.
'===========================================================================================
AIUtil("left_triangle").Click
DeselectCard "G/L Account Balance"

'===========================================================================================
'BP:  Navigate to Quick Links.
'		Choose the links below in the card to get further information:
'		• Display G/L Account Line Items
'		• Manage Journal Entries
'		• Post General Journal Entries
'		• Post Cash Journal Entries
'		• Clear G/L Accounts
'===========================================================================================
SelectCard "Quick Links"
AIUtil.FindTextBlock("Display G/L Account Line Items").Click
AIUtil.FindTextBlock("Display Line Items in General Ledger").CheckExists True
AIUtil("left_triangle").Click
DeselectCard "Quick Links"

'===========================================================================================
'BP:  Navigate to Tax Reconciliation Account Balance.
'		Choose the line item of the card to get further information.
'===========================================================================================
SelectCard "Tax Reconciliation Account Balance"
AIUtil.FindTextBlock("Tax Reconciliation Account Balance").Click
AIUtil.FindTextBlock("Tax Reconciliation Account Balance").CheckExists True
AIUtil("left_triangle").Click
DeselectCard "Tax Reconciliation Account Balance"

'===========================================================================================
'BP:  Navigate to G/L Items Changes.
'		Choose the header (or line point) of the card to get further information.
'===========================================================================================
SelectCard "G/L Item Changes"
AIUtil.FindTextBlock("GIL Item Changes").Click
AIUtil.FindText("Audit Journal").CheckExists True
AIUtil("left_triangle").Click
DeselectCard "G/L Item Changes"

'===========================================================================================
'BP:  Navigate to Days Payable Outstanding Indirect.
'		Choose the header (or each item) of the card to get further information.
'===========================================================================================
AIUtil.FindTextBlock("Indirect").Click
AIUtil.FindText("Days Payable Outstanding - Indirect").CheckExists True
AIUtil("left_triangle").Click

'===========================================================================================
'BP:  Navigate to Days Sales Outstanding.
'		Choose the header (or each item) of the card to get further information.
'===========================================================================================
AIUtil.FindTextBlock("Days Sales Outstanding").Click
AIUtil.FindTextBlock("Days Sales Outstanding", micFromTop, 1).CheckExists True
AIUtil("left_triangle").Click

'===========================================================================================
'BP:  Logout
'===========================================================================================
AIUtil("profile").Click
AIUtil.FindTextBlock("Sign Out").Click
AIUtil.FindTextBlock("0K").Click
Set Object = AIUtil("text_box", "User")
AIWaitForExist Object

AppContext.Close																			'Close the application at the end of your script



AIUtil.SetContext Browser("creationtime:=0")

