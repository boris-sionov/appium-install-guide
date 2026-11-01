// Wrap each table so it can fill the page width and scroll sideways only when it must.
document.querySelectorAll(".markdown-body table").forEach((table) => {
  const wrapper = document.createElement("div");
  wrapper.className = "table-scroll";
  table.before(wrapper);
  wrapper.append(table);
});
