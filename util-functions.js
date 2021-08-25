function get_status_text(status) {
	switch(parseInt(status)) {
		case 10 : return 'Draft';
		case 20 : return 'Active';
		case 30 : return 'Inactive';
		case 40 : return 'Pending';
		case 50 : return 'Completed';
		case 60 : return 'Rejected';
		case 70 : return 'Deploying';
		case 80 : return 'Approved';
		default : return 'N/A';
	}
}

function get_status_class(status) {
	switch(parseInt(status)) {
		case 10 : return 'default';
		case 20 : return 'success';
		case 30 : return 'danger';
		case 40 : return 'warning';
		case 50 : return 'success';
		case 60 : return 'danger';
		case 70 : return 'warning';
		case 80 : return 'info';
		default : return 'default';
	}
}

function get_status_icon(status) {
	switch(parseInt(status)) {
		case 10 : return 'folder';
		case 20 : return 'check';
		case 30 : return 'times';
		case 40 : return 'clock-o';
		case 50 : return 'check';
		case 60 : return 'ban';
		case 70 : return 'refresh';
		case 80 : return 'info-circle';
		default : return 'flag';
	}
}

function get_activity_type_text(type) {
	switch(parseInt(type)) {
		case 10 : return 'Login';
		case 20 : return 'Logout';
		case 30 : return 'Buy';
		case 40 : return 'Transfer';
		case 50 : return 'Login Error';
		default : return 'N/A';
	}
}

function get_activity_type_class(type) {
	switch(parseInt(type)) {
		case 10 : return 'primary';
		case 20 : return 'warning';
		case 30 : return 'success';
		case 40 : return 'danger';
		case 50 : return 'danger';
		default : return 'default';
	}
}

function get_activity_type_icon(type) {
	switch(parseInt(type)) {
		case 10 : return 'sign-in';
		case 20 : return 'sign-out';
		case 30 : return 'shopping-cart';
		case 40 : return 'exchange';
		case 50 : return 'user';
		default : return 'flag';
	}
}

function get_order_type_text(type) {
	switch(parseInt(type)) {
		case 10 : return 'Buy';
		case 20 : return 'Transfer';
		case 30 : return 'Exchange';
		default : return 'N/A';
	}
}

function get_order_type_class(type) {
	switch(parseInt(type)) {
		case 10 : return 'success';
		case 20 : return 'danger';
		case 30 : return 'info';
		default : return 'default';
	}
}

function get_transaction_type_text(type) {
	switch(parseInt(type)) {
		case 10 : return 'Buy';
		case 20 : return 'Transfer';
		case 30 : return 'Receive';
		case 40 : return 'Fees';
		case 50 : return 'Referral Bonus';
		default : return 'N/A';
	}
}

function get_transaction_type_class(type) {
	switch(parseInt(type)) {
		case 10 : return 'success';
		case 20 : return 'danger';
		case 30 : return 'info';
		case 40 : return 'default';
		case 50 : return 'success';
		default : return 'default';
	}
}

function get_lock_text(lock) {
	switch(parseInt(lock)) {
		case 0 : return 'In Sync';
		case 1 : return 'Locked';
	}
}

function get_lock_class(lock) {
	switch(parseInt(lock)) {
		case 0 : return 'success';
		case 1 : return 'warning';
	}
}

function get_lock_icon(lock) {
	switch(parseInt(lock)) {
		case 0 : return 'refresh';
		case 1 : return 'lock';
	}
}

function get_category_type_text(type) {
	switch(type) {
		case 'blog' : return 'Blog';
		case 'faq' : return 'FAQ';
	}
}

function get_page_type_text(type) {
	switch(type) {
		case 'about' : return 'About';
		case 'contact' : return 'Contact';
		case 'services' : return 'Services';
		case 'portfolio' : return 'Portfolio';
		case 'team' : return 'Team';
	}
}

function get_render_url(attachment_id) {
	if(attachment_id) {
		return g.base_url + '/attachment/render/' + attachment_id;
	}
	return g.base_url + '/assets/img/default-avatar.png';
}

function get_download_url(attachment_id) {
	return g.base_url + '/attachment/download/' + attachment_id;
}

function get_alert_url(url) {
	if(!url) {
		return '#';
	}

	if (url.indexOf("http://")==0 || url.indexOf("https://")==0) {
		return url;
	} else {
		return g.base_url+url;
	}
}
