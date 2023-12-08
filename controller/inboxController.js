// Get Inbox Page
function getInbox(req, res, next) {
  res.render("inbox", {
    title: "Inbox chat application",
  });
}

module.exports = {
  getInbox,
};
