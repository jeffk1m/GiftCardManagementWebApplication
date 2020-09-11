const moment = require("moment");

module.exports = {
  formatDate: function (date, format) {
    return moment(date).format(format);
  },

  editIcon: function (storyUser, loggedUser, giftID, floating = true) {
    if (storyUser._id.toString() == loggedUser._id.toString()) {
      if (floating) {
        return `<a href="/giftcards/edit/${giftID}" class = "btn-floating halfway-fab blue"> <i class = "fas fa-edit fa-small"></i><a>`;
      } else {
        return `a href="/giftcards/edit/${giftID}"><i class = "fas fa-edit"></i></a>`;
      }
    } else {
      return "";
    }
  },
  select: function (selected, options) {
    return options
      .fn(this)
      .replace(
        new RegExp(' value="' + selected + '"'),
        '$& selected="selected"'
      )
      .replace(
        new RegExp(">" + selected + "</option>"),
        ' selected="selected"$&'
      );
  },
};
