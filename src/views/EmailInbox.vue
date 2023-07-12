<script>
import { useAppOptionStore } from '@/stores/app-option';
import { RouterLink } from 'vue-router';
import axios from "axios";

const appOption = useAppOptionStore();

export default {
	props: {
		mailData: [],
		mailItem: ""
	},
	data() {
		return {
			mailData: [],
			mailItem: ""
		}
	},
	mounted() {
		appOption.appContentFullHeight = true;
		appOption.appContentClass = 'p-3';
	},
	beforeUnmount() {
		appOption.appContentFullHeight = false;
		appOption.appContentClass = '';
	},
	created() {
		axios
		.get(`http://localhost:4000/inbox`)
		.then((response) => {
			
			if (response.data.success) {
				console.log(response.data);
				this.mailData.push(response.data.data);
			}
		})
		.catch((error) => {
			console.error(error);
		})
	},
	methods: {
		handleViewContent(item) {
			this.mailItem = item;

			console.log(this.mailItem.id)
		}
	}
}
</script>
<template>
	<!-- BEGIN card -->
	<card class="h-100">
		<!-- BEGIN mailbox -->
		<div class="mailbox">
			<!-- BEGIN mailbox-toolbar -->
			<div class="mailbox-toolbar">
				<div class="mailbox-toolbar-item"><span class="mailbox-toolbar-text">Mailboxes</span></div>
				<div class="mailbox-toolbar-item"><RouterLink to="/email/inbox" class="mailbox-toolbar-link active">Inbox</RouterLink></div>
				<div class="mailbox-toolbar-item"><RouterLink to="/email/inbox" class="mailbox-toolbar-link">Sent</RouterLink></div>
				<div class="mailbox-toolbar-item"><RouterLink to="/email/inbox" class="mailbox-toolbar-link">Drafts (1)</RouterLink></div>
				<div class="mailbox-toolbar-item"><RouterLink to="/email/inbox" class="mailbox-toolbar-link">Junk</RouterLink></div>
				<div class="mailbox-toolbar-item"><RouterLink to="/email/compose" class="mailbox-toolbar-link text-inverse bg-inverse bg-opacity-15">New Message <i class="fa fa-pen fs-12px ms-1"></i></RouterLink></div>
			</div>
			<!-- END mailbox-toolbar -->
			<!-- BEGIN mailbox-body -->
			<div class="mailbox-body">
				<!-- BEGIN mailbox-sidebar -->
				<div class="mailbox-sidebar">
					<perfect-scrollbar class="h-100">
						<div class="mailbox-list">
							<div class="mailbox-list-item" v-if="mailData" v-for="mail in mailData" v-bind:class="{ 'has-attachment': mail.hasAttachment, 'unread': mail.unread, 'active': mail.active}" v-on:click="handleViewContent(mail)">
								<div class="mailbox-checkbox">
									<div class="form-check">
										<input class="form-check-input" type="checkbox" value="" :id="'mailCheckbox' + mail.id" />
										<label class="form-check-label" :for="'mailCheckbox' + mail.id"></label>
									</div>
								</div>
								<div class="mailbox-message">
									<div class="mailbox-sender">
										<span class="mailbox-sender-name">{{ mail.sender }}</span>
										<span class="mailbox-time">{{ mail.time }}</span>
									</div>
									<div class="mailbox-title">{{ mail.title }}</div>
									<div class="mailbox-desc">{{ mail.desc }}</div>
								</div>
							</div>
							<div class="mailbox-list-item" v-else>
								No records found
							</div>
						</div>
					</perfect-scrollbar>
				</div>
				<!-- END mailbox-sidebar -->
				<!-- BEGIN mailbox-content -->
				<div class="mailbox-content">
					<!-- BEGIN scrollbar -->
					<perfect-scrollbar class="h-100" >
						<!-- BEGIN mailbox-detail -->
						<div class="mailbox-detail" v-if="mailItem != ''">
							<!-- BEGIN mail-detail-header -->
							<div class="mailbox-detail-header">
								<div class="d-flex">
									<a href="#">
										<img src="/assets/img/user/user-1.jpg" alt="" width="40" class="rounded-circle" />
									</a>
									<div class="flex-fill ms-3">
										<div class="d-lg-flex align-items-center">
											<div class="flex-1">
												<div class="fw-600">{{ mailItem.sender }}</div>
												<div class="fs-13px">
													<span class="me-1">to</span> 
														<a href="#" class="text-decoration-none" v-for="add_item in mailItem.toValue">{{ add_item.address }}</a>
												</div>
											</div>
											<div class="fs-12px text-white text-opacity-50 text-lg-end mt-lg-0 mt-3">
												<!-- Nov 27, 2022 <span class="d-none d-lg-inline"><br /></span>at 7.00pm -->
												{{ mailItem.sentTime }}
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- END mailbox-detail-header -->
							<!-- BEGIN mailbox-detail-content -->
							<div class="mailbox-detail-content">
								<h4 class="mb-3">Your payment is received</h4>
								<!-- BEGIN mailbox-detail-attachment -->
								<div class="mailbox-detail-attachment">
									<div class="mailbox-attachment" v-for="attach_item in mailItem.attachments">
										<a href="#">
											<div class="document-file">
												<!-- fa fa-file-video
												<img src="/assets/img/gallery/gallery-10.jpg" alt=""> -->
												<i v-bind:class="{'fa fa-file-archive': attach_item.contentType == 'application/pdf', 'fa fa-file-archive': attach_item.contentType != 'application/pdf'}"></i>
											</div>
											<div class="document-name">{{ attach_item.filename }}</div>
										</a>
									</div>
								</div>
								<div class="mb-3"><a href="#" class="btn btn-rounded px-3 btn-sm bg-theme bg-opacity-20 text-theme fw-600 rounded">Download</a></div>
								<!-- END mailbox-detail-attachment -->
								<!-- BEGIN mailbox-detail-body -->
								<div class="mailbox-detail-body" v-html="mailItem.textAsHtml">
								</div>
								<!-- END mailbox-detail-body -->
							</div>
							<!-- END mailbox-detail-content -->
						</div>
						<!-- END mailbox-detail -->
					</perfect-scrollbar>
					<!-- END scrollbar -->
				</div>
				<!-- END mailbox-content -->
			</div>
			<!-- END mailbox-body -->
		</div>
		<!-- END mailbox -->
	</card>
	<!-- END card -->
</template>