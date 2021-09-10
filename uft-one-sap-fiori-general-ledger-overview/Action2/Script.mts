
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

'===========================================================================================
'BP:  The following input fields are available:
'		Display Currency
'		Fin. Statement Vers.
'		Ledger
'		Company Code
'		Planning Category
'		You can enter and save default values.
'===========================================================================================

'===========================================================================================
'BP:  Open the General Ledger Overview app.
'		Note – for users with many roles assigned, it may be faster to find an app by searching for it by entering its name in the field.
'===========================================================================================

'===========================================================================================
'BP:  Make the following entries on the filter bar and choose Go:
'		Display Currency: USD
'		Key Date: <current date>
'		Planning Category: <PLN>
'		Statement Version: <YCOA>
'		Ledger: <0L>
'		Company Code: <1710>
'===========================================================================================

'===========================================================================================
'BP:  To customize the cards on the overview page, choose the User Icon and choose Manage Cards.
'===========================================================================================

'===========================================================================================
'BP:  Set your preferences and choose OK.
'===========================================================================================

'===========================================================================================
'BP:  Navigate to Journal Entries to be Verified.
'		Choose the header (or line point) of the card to get further information.
'===========================================================================================

'===========================================================================================
'BP:  Navigate to G/L Account Balance.
'		Choose the header (or line point) of the card to get further information.
'===========================================================================================

'===========================================================================================
'BP:  If you click on a line item, you are directly navigated to the selected account group.
'===========================================================================================

'===========================================================================================
'BP:  Navigate to Quick Links.
'		Choose the links below in the card to get further information:
'		• Display G/L Account Line Items
'		• Manage Journal Entries
'		• Post General Journal Entries
'		• Post Cash Journal Entries
'		• Clear G/L Accounts
'===========================================================================================

'===========================================================================================
'BP:  Navigate to Tax Reconciliation Account Balance.
'		Choose the line item of the card to get further information.
'===========================================================================================

'===========================================================================================
'BP:  Navigate to G/L Items Changes.
'		Choose the header (or line point) of the card to get further information.
'===========================================================================================

'===========================================================================================
'BP:  Navigate to Days Payable Outstanding Indirect.
'		Choose the header (or each item) of the card to get further information.
'===========================================================================================

'===========================================================================================
'BP:  Navigate to Days Sales Outstanding.
'		Choose the header (or each item) of the card to get further information.
'===========================================================================================

'===========================================================================================
'BP:  If you click on a line item, you are directly navigated to the selected account group.
'===========================================================================================

AppContext.Close																			'Close the application at the end of your script

