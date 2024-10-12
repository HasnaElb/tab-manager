document.getElementById('saveTabs').addEventListener('click', saveTabs);
document.getElementById('restoreTabs').addEventListener('click', restoreTabs);
document.getElementById('closeTabs').addEventListener('click', closeTabs);

async function saveTabs() {
	  const tabs = await chrome.tabs.query({ currentWindow: true });
	  const tabInfo = tabs.map(tab => ({ title: tab.title, url: tab.url }));
	  await chrome.storage.local.set({ savedTabs: tabInfo });
	  alert('Tabs saved successfully!');
	  displaySavedTabs();
}

async function restoreTabs() {
	const { savedTabs } = await chrome.storage.local.get('savedTabs');
	if (savedTabs) {
		for (const tab of savedTabs) {
			chrome.tabs.create({ url: tab.url });
		}
		alert('Tabs restored!');
	} else {
		alert('No saved tabs found.');
	}
}

async function closeTabs() {
	const tabs = await chrome.tabs.query({ currentWindow: true });
	for (const tab of tabs) {
		chrome.tabs.remove(tab.id);
	}
	alert('All tabs closed.');
}

async function displaySavedTabs() {
	const { savedTabs } = await chrome.storage.local.get('savedTabs');
	const tabList = document.getElementById('tabList');
	tabList.innerHTML = '';
	if (savedTabs) {
		savedTabs.forEach(tab => {
			const li = document.createElement('li');
			li.textContent = tab.title;
			tabList.appendChild(li);
		});
	}
}

// Display saved tabs when the popup opens
displaySavedTabs();
