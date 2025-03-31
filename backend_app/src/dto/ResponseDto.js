export default class ResponseDto {
  timestamp;
  statusCode;
  statusCodeDesc;
  statusCodeMessage;
  additionalData;

  constructor(
    timestamp,
    statusCode,
    statusCodeDesc,
    statusCodeMessage,
    additionalData
  ) {
    this.timestamp = timestamp;
    this.statusCode = statusCode;
    this.statusCodeDesc = statusCodeDesc;
    this.statusCodeMessage = statusCodeMessage;
    this.additionalData = additionalData;
  }

  getTimeStamp() {
    return this.timestamp;
  }

  setTimeStamp(timestamp) {
    this.timestamp = timestamp;
  }

  getStatusCode() {
    return this.statusCode;
  }

  setStatusCode(statusCode) {
    this.statusCode = statusCode;
  }

  getStatusCodeDesc() {
    return this.statusCodeDesc;
  }

  setStatusCodeDesc(statusCodeDesc) {
    this.statusCodeDesc = statusCodeDesc;
  }

  getStatusCodeMessage() {
    return this.statusCodeMessage;
  }

  setStatusCodeMessage(statusCodeMessage) {
    this.statusCodeMessage = statusCodeMessage;
  }

  getAdditionalData() {
    return this.additionalData;
  }

  setAdditionalData(additionalData) {
    this.additionalData = additionalData;
  }
}
