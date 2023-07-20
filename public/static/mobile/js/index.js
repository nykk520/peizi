const tabLinks = document.querySelectorAll('.tab-link');
const tabItems = document.querySelectorAll('.home-ul');
tabLinks.forEach(tabLink => {
  tabLink.addEventListener('click', () => {
    // 移除所有选项卡的活动状态
    tabLinks.forEach(link => link.classList.remove('active'));
    tabItems.forEach(item => item.classList.remove('home-ul-active'));
    
    // 添加当前选项卡的活动状态
    tabLink.classList.add('active');
    const selectedTab = tabLink.dataset.tab;
    const selectedContent = document.getElementById(selectedTab);
    selectedContent.classList.add('home-ul-active');
  });
});

const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', redirectToURL);
function redirectToURL() {
  const searchInput = document.getElementById('search-input').value;
  
  const baseURL = document.getElementById('search-url').value +'?wd=' + searchInput;
  window.location.href = baseURL;
}