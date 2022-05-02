import scale from '../util/deviceUtil';
import { getId } from '../util/nodeUtil';
export const flowMixin = {
  data() {
    return {
      backIcon:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5OTVGOTZFMDVBMEExMUVCQkU5NUMwQUJGOUM0N0U5RiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5OTVGOTZFMTVBMEExMUVCQkU5NUMwQUJGOUM0N0U5RiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk5NUY5NkRFNUEwQTExRUJCRTk1QzBBQkY5QzQ3RTlGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk5NUY5NkRGNUEwQTExRUJCRTk1QzBBQkY5QzQ3RTlGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+zq5KrAAAAQdJREFUeNpiXLxiPQMWYAPEK4E4Boj3M+ABTFjE4oF4HxBLATE/AwHAhMbuAOIFQMwKFRPEYQmGAdxAvA6Iy9Hk5wHxZyDeA8S5QCyEzQA5ID4CxP44LOECYmcgngTED4G4DIiZkQ04CsQGDMQBHiDuBOLNQMwBM2ABA+nAE4inwQyoBeI4IP5FoiGJQGzFAuUsBuL7QAxKFCJIirYC8TYg/gv1ZiRa1CYjRxEoIM2A+DqS2ByoU2cCcSYQKwPxBiR5O/Q4BrnCEoh34XD2WyAOAeI1UL4StkTyEYi9gDgNiI9hkQd5JwmI74HCEFcqAymaDcSvcMiDElcRSJ6FgXywCYg9AAIMAD9tLUwcWmLOAAAAAElFTkSuQmCC',
      ccIcon:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3RTk1MUY3NDg4OTcxMUVCOUE0MUY3RUY5QzdBQkFBRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3RTk1MUY3NTg4OTcxMUVCOUE0MUY3RUY5QzdBQkFBRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdFOTUxRjcyODg5NzExRUI5QTQxRjdFRjlDN0FCQUFEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdFOTUxRjczODg5NzExRUI5QTQxRjdFRjlDN0FCQUFEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+c8jWPgAAAS1JREFUeNpi/P//PwMFgAmINYHYGIrlGMkwUAaITaAGGAIxN5LcJRYiDBBAcgEIi+FRewabgexArAt1BQgrk+B6sIGMQKyG5A0dIGYlIzy/APFNkIErgViUgXJwHoj/gWJpAhD/IUHjbyC+ikX8LCzajwFxPZGGvgbiGUCsji38YAYyEGnoJSCuAuJoIEaPzJdA/BTZQEKGrgficiAuBGIhXK5DNxCboaDw6gTiSUCcDcRauJILLgORDX0IxHlAvAOIfaAYG/gPjWEwICbraUNTAq5cdRuI0/C5EB1U4zEMnlxIMZCPgPxpUg3EB34B8RVyDARFVAOWJHUZaigcEFN8zQPirUD8E5qMGpH0ncGMc2Ask4itgHg3EO8HYlV0eXIMhBm6DIgZ0eUAAgwArea7JkLeWYgAAAAASUVORK5CYII=',
      ccIcon2:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5QjdDREQyRTg4ODMxMUVCQjI1Q0E0RkQ2NTBDRTJCMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5QjdDREQyRjg4ODMxMUVCQjI1Q0E0RkQ2NTBDRTJCMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjlCN0NERDJDODg4MzExRUJCMjVDQTRGRDY1MENFMkIxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlCN0NERDJEODg4MzExRUJCMjVDQTRGRDY1MENFMkIxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+TpWGgwAAAP1JREFUeNpi/J/FQApgAmIDIHYBYlcg1mchQpMCVIMbEDsBsTCS3B5sBggCsSPUBhBWxmP4bpABbEBsjeQsY6hTiQFgA+4BsTSRGv4DMSOU/QaIL4JsCgbiTwQ0fgfZhqQZBPYC8T+QASehAYTLkIdAnA/EdujOZ0DyKy5D9gGxFxDXATE7mtweBrTAQjekD4i9gXg6EMugab4NdRkDejSehMaGHBCvBeLJWJwOdz42A0DgNBRHAHEOjnDZg5w0cQELHOL/oGFD0AAY+I3GPwXEH4kx4C8QdwCxLVrs7EZWhC8zlUENYYDGzi4g5kP2PzEuQI9iUNSdQFYEEGAA4xAze00Zfk4AAAAASUVORK5CYII=',
      approverIcon:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4MTdGMUQ3RTg4OTcxMUVCOEM4QThBRTkzNUQ1OUNEQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4MTdGMUQ3Rjg4OTcxMUVCOEM4QThBRTkzNUQ1OUNEQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjgxN0YxRDdDODg5NzExRUI4QzhBOEFFOTM1RDU5Q0RBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjgxN0YxRDdEODg5NzExRUI4QzhBOEFFOTM1RDU5Q0RBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+M6Uh4QAAARNJREFUeNpi/P//PwMOIAzEoUBsDcRSULFnQHwEiFcD8TtsmhhxGGgOxDVAzIPDss9A3ATEZ4gxUAGIZwAxOwN+8BOI04H4IbIgExaFSUQYxgBVk4guiM1AUwbigSkhAxmBmIMEAzkJGfgfPUwIgAfEeHkDCQZuIMbAjUB8gAjD9gHxZmLTISM0UUcCsQCa3AcgXgrEa6FBRNCFsLBcBcQLsMgtBuI12AzDZyAMSGMRU8anAeRlkKGpQGwDxKxo8vxYktFPqLeRwR8gPgXE01iAhAUQR5AQs6AcIo5FPBCIb4Ncp8tAPaDHRChMSAQKoDDUAzKMqGTgWUY8BSxZABQpVUCsRCXz7oAM1ABiWWo5ECDAAE5EOqFnWT67AAAAAElFTkSuQmCC',
      approverIcon2:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4RkRGREEyRjg4ODMxMUVCQjM3QThEQkQ4QTk5NzVGRSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4RkRGREEzMDg4ODMxMUVCQjM3QThEQkQ4QTk5NzVGRSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjhGREZEQTJEODg4MzExRUJCMzdBOERCRDhBOTk3NUZFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhGREZEQTJFODg4MzExRUJCMzdBOERCRDhBOTk3NUZFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6yeCIgAAANdJREFUeNpi/J/FgA6YgDgViDOAWBcqdhmIpwPxHCD+h6yYEc0AFiBeC8R+DNjBRiAOBuK/yLYhgzQ8mkHAH4hT0J2LDMIYCIMwfAbwEmEAHz4DjhFhwFF8BrQD8Qs8mp8BcQc+A0AKrIF4LxbNu4DYBt0CRizpAAY+AzEPlP0NGj7/0BWxQGk9IFZCEudB0gwCXECcDMSvkcQeAvF5kAG+QLyJiMCbhUUsFhQGAQzkg2CQARoUGKAI8kIoEKuRacBNkAF2QCxBpgFiIAMmALE4mQa8AAgwAP8aIlYmu/RqAAAAAElFTkSuQmCC',
      noticeIcon:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4QUYyQ0NDRjg4OTcxMUVCQjc0Qzk1MkQ0QjQ0QjAxNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4QUYyQ0NEMDg4OTcxMUVCQjc0Qzk1MkQ0QjQ0QjAxNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjhBRjJDQ0NEODg5NzExRUJCNzRDOTUyRDRCNDRCMDE1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhBRjJDQ0NFODg5NzExRUJCNzRDOTUyRDRCNDRCMDE1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+c7/9MAAAANpJREFUeNpi/P//PwMeEAHEsVD2YiBegUshIx6D5IF4AZpYAhA/xKaYCZvhQOwIxIVY5AqhcoyEXCQAxE1ArMuAH1wA4hog/orNIGYgngjE2gzEgUtAXADE/9G95kiCISCgB8T22MLIhoF0YIvNIHEyDBLGZhArAwWAiYFKYPAaZAfNEqQCLVhsgxKkEpCeQUFg/wbiVCZo7qYkxkB6Y0EGmVAhiExBXlOhRmDjK49kgZgdTewHED/BppgFjyXBQOyPJrYeiCeRatB0aNHiCC0q9gPxTFyKAQIMAO9xLUBI8teQAAAAAElFTkSuQmCC',
      noticeIcon2:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBMTFBMzcyRDg4ODMxMUVCQkIyNjgxNDEyRDYxNzU5RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBMTFBMzcyRTg4ODMxMUVCQkIyNjgxNDEyRDYxNzU5RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkExMUEzNzJCODg4MzExRUJCQjI2ODE0MTJENjE3NTlEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkExMUEzNzJDODg4MzExRUJCQjI2ODE0MTJENjE3NTlEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+KsivwgAAANBJREFUeNpi/P//PwM6CJj6xR1ILYNyozZk8+xEV8OIrhGoiRNIHQBiM6jQaSC2B2r+jqyOCU1TLpB6jqQJBExBYkC5LKw2AiXygdQEBvwgC2jzdLhGoCYuqE18BDR+BGIpoOZvMKcaE6EJBPiB2ADZj8IMxAM2jMAhBVCsUYAEPaLgUPWf8lkHSJ8CYk4iNX4DxS3IxnYSNIEAKOo6WYCECTR+SAFGjNgSOTEAWyIHRfIGkBxUCKQgAJhaPuKNDqgCkEY9INYF4rXomkAAIMAAMIhB7BfalXEAAAAASUVORK5CYII=',
      writeIcon:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3QjU1NENFRTg4OTcxMUVCOTQ5Rjk5NEEwOEQyRkIxRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3QjU1NENFRjg4OTcxMUVCOTQ5Rjk5NEEwOEQyRkIxRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdCNTU0Q0VDODg5NzExRUI5NDlGOTk0QTA4RDJGQjFGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdCNTU0Q0VEODg5NzExRUI5NDlGOTk0QTA4RDJGQjFGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+RD0YHwAAAONJREFUeNpi+P//PwMFWAmIlwHxGiDWBIkxgggygRIQ9wExP5T/DYhLKDFwARDLo4m9ZWIgH/zFIvaDEgNbgfgjEh/EriM1AqYBcSsQCyCJzYViJVIiBT0C7gNxERB/QFfIRIZhIKAIxKXYFDORYRgM8JNqID7DQBHQS4qBhAwrgoYjUQYSY9g9XN5ioqZhIMBChmEcQCyAw7zfLGS4LAGIw3EY+J+JDG/+w+Pjf6CcshLIECMhzECO4MJh4B8WIg1TIjJX/WIhwjCQhXOJLIHAYfgeSeAJFm/+Bikk0sBfAAEGADNxwGkVd2FCAAAAAElFTkSuQmCC',
      branchIcon:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABrElEQVQ4jaXUvWsVURAF8F+eiUUSFDHmH1iiqyKLaVNEBT8LRcWgNiKKCCoi1kJA0VrTio2gMRDtJIhIbCLY6GKzSrYUERvxCxJJtNgNXh8v2Ze8A9ucM3tm7p2503Z/9IkV4iD68ywdDsn2lbrhBR5FcdKDy3mWzkGtBcMfeIoLeBDFyerlVrgJe7EVPViFvlIbwrooTo40Y9iHO9hXEbcbz6sMj+EeuptIPI+7ixl24RYuBdw3jOMVPuIXzuEEZnAyz9LHoeEGbMMenEZvoI3hIr7UJR4pEx3Ks3SSoilf0YmOBpX+xtXyx3rEZdLBPEvfLpDtWNvw0LzEFbxZRO/EQJ6l0yFZNYd/ltDmGpE1xb38bKAN4rX/GxNiBlNRnGyvN+xVjMUaDOAGPpV6h2IGHyqaFiLDZ0xGcbIzNFzAd0zhGiLcDrTjmFbM5FkcwA68KwuZiOLkKLRVbJuh0qRrqaAS8zhf1ZQx9GOiCcMazjTzlj9gv3/LYQvWK+53IzaXcc9weDnb5n35hRgvDUdxKs/S2Vb2YbeiOSOKdzxLaxt7F27mWXo9JP8CRCZkA/s07y8AAAAASUVORK5CYII=',
      branchIcon2:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5M0QzM0Y4Qzg4ODMxMUVCQjY2NUM1RkRGMDAwQUM5OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5M0QzM0Y4RDg4ODMxMUVCQjY2NUM1RkRGMDAwQUM5OCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjkzRDMzRjhBODg4MzExRUJCNjY1QzVGREYwMDBBQzk4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjkzRDMzRjhCODg4MzExRUJCNjY1QzVGREYwMDBBQzk4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+t1RyzAAAATVJREFUeNqk0zFLw0AUwPFcFKEFLWinYjfdMohg1XYtXbqIg1JHcRAFKSjYxclZEFSk3foB2qlgQRwcFETED+AiCAqCg+JWavw/eIUQmtDQg9+Qy917d+/ujHs2ZUVoyyjiCK502Fa09oBN1DAiHaMDTBrDHNIYxyu2MIlSWIA4KthDos//VbSDAsyiCSckwZ+Msftk3ceTTu7iAktIwqCFjiwf57KCU93bDBYQ02DvWMOdJ0HCcxLX0mE4Rte3Cvmu4xCfvn+OJnjsddghlQ9qxvshAU5QxQ1+dcAGnpHzTX7DFQreAAfYRl4LVcYPUriVQmFRz/0b91rI9V4NhjnGclANXjTrMb4CxsjcFTPAY5I7P49pTGAHGTSkVibia5RgH7q9XbloUV9jFpdadLml1r8AAwD7njvXH9ptygAAAABJRU5ErkJggg==',
      instationIcon2:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5RTRGMURCNDg4ODMxMUVCODdBMTlCQkU1RkU4NEZFMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5RTRGMURCNTg4ODMxMUVCODdBMTlCQkU1RkU4NEZFMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjlFNEYxREIyODg4MzExRUI4N0ExOUJCRTVGRTg0RkUxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlFNEYxREIzODg4MzExRUI4N0ExOUJCRTVGRTg0RkUxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+EJ1+ngAAAORJREFUeNpi/D9Z+BADA4MtA+ngHxAfZQISdgzkgc8gvSxkaLwFxLxAzAXiMJGoeTcQWwLxSZgALgPWAHETEH9CElsAxKFAPBuIA2CC2LywHIhzgFgfiKcAcT0QvwTiGUC8DYitkBWjG7AZiLOAeD0QO0CdXAbE30AhDsSq6LYhG/AciGOBeClUMwi4AvF5fIGCbIAkEF8AYgVSQhU9EBVIjVOYAUfJSA9nkQ2wAWJGJCwCxB+B2BeIg4D4HRALoqlxxpcOqoD4EhBvAeIN0NRXRkwYwEAokob/QFwKxJHYFAIEGAD4qyZFdAGmBAAAAABJRU5ErkJggg==',
      emailIcon2:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAAA0klEQVQokaXQLUuDcRSG8d/+yIqwME2Dp2mwyHAgMgbWVYM2g1gGGg0GmywoGPwCpvkNhLUlQZiLhr2YDTItDtbE4CNsuKHPdtf7XBfnnFShVT3EJbKSpY+TMCMMy7gOWMcNPhMK6igGnOMsFt39A3xCGbvYDzhADzvYwzYeJ4CvqGADS+jiNMTlYrxJBxG2YlkbH7jAKppo4BY5CMYToYYHvGANGVz5fnYLpVFgYcqdm7jHM96RR3rS4DTBT1b+6H+dkDgBwzn4QcAx3maA+zj6AgiPJM/S8b5bAAAAAElFTkSuQmCC',
      smsIcon2:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAW5JREFUOE+lkztLA1EQhc/caF4IIiriT5BdTSEWgoUoRPKwFREUEQuxEv+ApWVQkEAaEQRJq+5GxUdhrUgSg41gpVhYKIHdKNmR3ZA1MZFdya0uZ2Y+5szcS2jxULN6XZXDzBgGEGKQAcO4E22eB38ke/g7vw6gqfISgHkwxpuBCbgBU8ofz6WqcRugqdICmPbcOGLCbDCaT5u5FqB4JIWEwDmBeiyxvRP89d7AIl83uPRm6q9lgXBHJJ+1ALoirzCQNO/ekSRE7xhKV1Ng7dmGeEf3IbpCtk6gdX8sl7AAmiLtArT4HwCDDoKx3FylA3Uwwcxr9mCcLaAOoKnSBJgu3AzwZ/o1FipdyKfMCLuD8JNgz7Qvns3bayxl5KGygTMC+hwhxJOB6P2lvcZqgX4srTLRzt8AzoB5MxAvXDc8JFPgk4F+veyxdkeEWwY+mOnF/VNW5A0Ay0TYeiwa29JM4dPJTtPP5FRUG28Z8A2Sh5YRa1ZSeAAAAABJRU5ErkJggg==',
      dingIcon2:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAXtJREFUOE+lkz1Lw1AUht9zW/9BY1edBR1cbBQENx3UDh0UkwiKDg466VpHBUEFBydtAgoufoC6iQjeLE5F/4EgNf0BgjZHEkl6m0YseKfLfc957vkk/PNQmn+hUi+S4H5i6gt0Jn5hn6qulTtP2rcBdKe+C+bV1MCI9qSRW1O1FoBue9xJRtLUYr/4UnC8G2KMA6hRozHN2cwCGItpQCbcuoY2EWghYNjxJplxGRv7PCrnux+Gjt56RDZrgVEEMNASOmHq0dCuQoBu19YBsRUZBD8I8Ifvs+Na+bBwBfu9RKCzJsTfkGZ++wdQ8U5AmGmKdCHNXPBrfEaOvUFf4Cl+YJxKS5v9BRAmV5aGthk56LZ3CGApHZBIITYilINZEF+fK41MVwnEB6kptBVRCZ2BezB2BGGfgd5IIrWIYZGabUx27pUI18xYVovc0kYlz7RBugMwplJTBymGJEeZUAMjH+p/jXIEUZeJ2SeIzDMTV925Dpapk11Qbb4B0ZabEUsalsQAAAAASUVORK5CYII=',
      divideIcon2:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMjZBQzJCRENBOUIxMUVCQTkxNEE2RjFDREIxOTNFNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMjZBQzJCRUNBOUIxMUVCQTkxNEE2RjFDREIxOTNFNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyNkFDMkJCQ0E5QjExRUJBOTE0QTZGMUNEQjE5M0U2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAyNkFDMkJDQ0E5QjExRUJBOTE0QTZGMUNEQjE5M0U2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+xpF4cAAAAGdJREFUeNpiYTj8wJOBgWEuAwQk/7eR3w5iMB55+AFEA/kCUD6KOhYoRxIqAGJLQdn8DKgARR0TEocBjY0OUNQxMZAJRjWOaiRf43Mk/gs8alHUgTSmQDU8BWUXJMmPUAwDKOoAAgwAwSYZ7BpGt0cAAAAASUVORK5CYII=',
      webhookIcon2:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBMjk2MzY0Mjg4ODMxMUVCOTAwM0VFNUQyOTk4ODY4RSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBMjk2MzY0Mzg4ODMxMUVCOTAwM0VFNUQyOTk4ODY4RSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkEyOTYzNjQwODg4MzExRUI5MDAzRUU1RDI5OTg4NjhFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkEyOTYzNjQxODg4MzExRUI5MDAzRUU1RDI5OTg4NjhFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+cm+0OQAAAXtJREFUeNqM008oRFEUx/F5Q4OiFCXFRlYWEpFIMSU21iI7SVIWFv7EAsmfEoqS/2WhsGDDhpqFBYqIQhRKKMXCv1LG+N76TT2vybj16U0zd86555x3rcBYgivEikArGpCMQ7TA59zodoVew+jCGhrxgk0U/ydAiv5k7CMXTdjAoHNzZIgAhfjCLo71XaathDi8/nWCgE1wReNZn2PClbCDKGSjDuf4UOYTPIYLcItxTOIKVchTgJxwTYzV8059MNmPsKypBGx7fgWowDUmkIQO9OFev/foFG9qoAlaGpxCieZtsgyhF08YsSU6xajKMz2oxTq8Fm/itl6UbilDJVYc5VkqIw2dmIXHnCAf1cpYoM0XmEG6oz/BJn6ryYtuRTbPd9tmP8rxqXqNS8eJzKj9pgSfIpqZN2NPGxaQoUnU60J5kYp+LJnS3ep4EeaVxZQxh2mcaXSm41tIxA1WkYU2S9fZ3LIB1fiAKWXx6zQeNa4G8bpk7Tj4EWAAMKNjsS2KH3wAAAAASUVORK5CYII=',
      childflowIcon2:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NUQxQTlGNDg4ODMxMUVCQkQ3MEEzRTQ0NTQ3RDBGQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NUQxQTlGNTg4ODMxMUVCQkQ3MEEzRTQ0NTQ3RDBGQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk1RDFBOUYyODg4MzExRUJCRDcwQTNFNDQ1NDdEMEZCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk1RDFBOUYzODg4MzExRUJCRDcwQTNFNDQ1NDdEMEZCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+XUYwEgAAASVJREFUeNpi/D9ZmIFE0ATE5UD8EYiTGEk0QBeILyHxXzORaLsQGp8f3QBRIF4GxKeBuAyLAUeB+DwSv5sFTUE/EEdC2SZAfAWItyHJ/wFidpDTgdgNiC+gu0ATjW+IJQy0gHgdSDNIAN2ATWh8fSBmRuLDXLcMJoDuBV4o3Qm1LRSIfwNxHBD/BeJwIH4OxEewGcAEVfAYiCuBmBWI1wBxFJR9D4iVgLgPiP9hM8AaiGWgtv8H4l9AHALEO6EugYHPDGi2wkA0lF6JJAYyZBeaN32wGQAKrGAgvokWzyBwFY1/Bd2AFmiUiEBtZMESM6C0fxKIFwJxKbIkKC/8BNJsSGLOQLyP2LQNcsEbNLGXpGQOkAEZQPwMiL8BcTMWP+MFAAEGALiPOuhEFZuiAAAAAElFTkSuQmCC',
      writeIcon:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAA1klEQVQokY3RsS7FYBQH8F+li4SB2BALT9Aayb2bmCRWiQfwBn2AvonFYjASEXO7mpjEJhYSiYjPoFfqc9ves50v3y//c3KSEIJZKq/LTVziGfvJLDCvy0XcYa15quZmimMey61+pTcxr8t17OIMO7jAC8adsNnpBqsNOMQS3quseJ0KIzSpoyorTifNvx070BNu2//+wB40qrLicSocQPfxZEkIoRf5Ofgoch/pUFJelwc4jxNTXA2Md41x5D5TbHQknWArTvodFW9YwAP2WknH2O6AX98ZS1tiBAI/jgAAAABJRU5ErkJggg==',
      branchPlusIcon:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAaCAYAAACkVDyJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2MjEzODhCQzYyMEYxMUVCOEQ5OUFBMThGREJDQkRBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2MjEzODhCRDYyMEYxMUVCOEQ5OUFBMThGREJDQkRBNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjYyMTM4OEJBNjIwRjExRUI4RDk5QUExOEZEQkNCREE1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjYyMTM4OEJCNjIwRjExRUI4RDk5QUExOEZEQkNCREE1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+G/aRRQAAAb5JREFUeNpi/F/IQA5ohdLVpGpkIVE9ExBPBeIMKF8IiHOA+C+xBjCS4EM2IF4AxJFo4iuAOB6If1HTQi4gXg3EXjjktwFxKBB/o4aFAkC8BYitCag7CsQ+QPyBEgslgHgHEOsTGewXgdgDiF+QY6ECEO8GYhUSE9YdIHYF4ge4Uh02oAUNIhUysowKVK8WsRaaAfEhIJbCaWTuYQjGDaSgZpgRyofOQLwBiHnw+kHRhhifCgPxXiAOgNIYPgwC4q0ELSMN8EDNDEK3MAmIVwExOwP1ATvU7CRYKi0B0l0gNt44IxSM948wMEy2xafiPxCXMFHPI4xElcWwfAjy7iwgZibK7L7/ELqIkVjXgAr3NCCeB/PhPCAOJ7YAJhGAzAyD2oGSStcCsTcQf6GiZV+gZq7DlQ/3ALELtPQXwptACMfZO2jtcpKYslQbiHfhLW3wg2dA7AbEVwdt4c0A1QDKWJdIsOwSVM8DfG0UfABUrzkA8TEiLDsGVfuCUKOIEHgPDaIdeNTsgKp5T0wrjBgAaqv4QxtMDFgaUf7EtGdIsRCWgWOAeAaS2AyoGNEFBiMFDWFGaEP4PykaAQIMAPtYZIn4xcpfAAAAAElFTkSuQmCC',
      plusIcon:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1QUQxNDBGODYyMEYxMUVCODg5NkUxMUU4RjlCMzM3MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1QUQxNDBGOTYyMEYxMUVCODg5NkUxMUU4RjlCMzM3MyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjVBRDE0MEY2NjIwRjExRUI4ODk2RTExRThGOUIzMzczIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjVBRDE0MEY3NjIwRjExRUI4ODk2RTExRThGOUIzMzczIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+NTYx9wAAAqtJREFUeNqsVs9rE0EU/mZ3MFHTiNAS60kjHkUv9mA99KoUFXPzICIoIhRRxF4kxapVPFSk4MWDRQIeNRTiSfBg/wAVkYDUetAYtbVi86vd3XFnt0lmZye7SZqBRzabed8337yX9x5hl9HuIiG/s3ZAaJsk4idRELGN9yyMnIaQiaaFEFrCc0tSGqBKaxCNjEVxfOIEIn2j0OkQiLYLjK3bmN9gGu9R+zeH3K05vJmpCsSWiphIMRTJuOm4/+MUYgOTNkkyOILWAkrLaYwPvLS/mRuEPlJN4eqS7R+J4OHqXfQlMqFkzlHtPbH+jOPDfZuHRiuFRNhEbcc72LL9CrpZa6VHuBq7aT8ZglImKhSTQ8fU91TXZHxxX47BsbzYHsmuwsNntiKemAoEnDmqORa04ol7DlYz+aBSqCE1fdqOx+5AsC/zxLHgmA7aWCn576T5MjMaH0WvloslJg/xK6SRQz0jpJGDskLqTxqSUMZMdYXXiN543jvMMPbWkq41EZQ0deK1rtQw1lbRp4qKUQTRY5538snryqaZGXgIy/ypqireQmzUPvUshkbtnVxLNaniM6z+zvWMsLSU82ArCC1kzmftqygEAvEE2XOEhRTzAp5fysptiwrN0615+dcVLH9Noz/5pCWYHFPVWlpM42OuLHcNTdFETUzse4Hyn8ddXyX35RjNNuW7UngIuT0Yuo3KytOOySors45vHUfoFOqkcTcZ+PW5ius7x1HMX4C5vhhKxPcU8xdtnxuOr9uaTDlpVB2/2RNd05Ec3oazsyexY/AYaPSAU5jriWFUP+Bv4RWenctiYb7cOLCiF7Y3YnhNHqSYLxTeq/SNGFQxgRFpYx1MCyG0JEXKIYoGDLSWMGtaHY6JrJMxUSYWVQcRYrODsIqUbXbU/y/AAAVBHlwtF3I9AAAAAElFTkSuQmCC',
      optionIcon:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAACGUlEQVRYhe3YTUgUYRzH8e88u4hgSjoePESyB1kECySERbBDLSqBnUS8WglB4C0QvAShBN1c0IOQkIcQwiCKVjHwpujBFwzNLffSoUPmy6bRrrPj4VFwnTWf3R1m5uAP/jA8+7x8mLd9GM2M6AA1wAsgDJThbPaAaaAXiGlmRA8Cc8BVhyFnswOEBDDgAQxIw4BAXiavpFng/D3zv1wRbgvO5hJ0UTwH8uc8ovQa3BsDvRbMNGxvwMZbWB4B41/BoNzPUOIHfHkNwg++Iqisg8Zn0DkDZdddAAGsjsLM08y28hpoGwd/sQOgkqrsqNnnVtTNbgdA98ch2G5tj72ztmXrZzuoohbCQ9bF6p9Y+5YHCwIpPmUmaD6JKtbh+we41QM3Hlq7apoDoO1vUBEETUBTv6zz8vtrQSC1SxabUJ8xtS9fB3lGDbQ0DLtxtRmrGqB1NG+UGih1AO871FGBlrxR6i/G3Ti8uQ1z/bC1BqYha2sNfi7YhtLMiG7mNCJbfEVy8UCL9bf4JES7wEgqTWXPv72RlIvGo4CZWYFmaH2lfKbs234YSYg+gM1PkDYyqzoMdwYdBp2gJh/B5kd5fLqq77oAOkFNPZao1L6swwNYGXEJBJBOweceuXH7+wsWh2D+pdJQe54yG+O5PfUl6KJ4ErTnNuJU/gjkxyKvZEoAfciPRW5nB+gTwDoQAiaAhAuQxPHaIWD9CBLMn/KBVbnLAAAAAElFTkSuQmCC',
      settingBaseIcon:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgklEQVQ4jZXTvWuUQRAG8N/7ojYW+hekORvFgETlEC2EawwImg9CFFFzjXAIip2NHEREBFFIYZEmGvIdUItrrNRGCCIWURQ/CkFJFQUVCcE7i50rPF6ITrO7M88zOzvPTtaqKbItqOIyfmAU82h2AvOC8xm8xh10YRdmsIxBZEUJMgwEaAKlgqp2YgEvcLydKEclnIsB2sj24D6WUMlaNV+x/R+IRfYtx17cxe//IDaDsy/HR5yVmjWH1gbkBXQH50MuvWcRmzAcwYcFxAZ6MBTnB7jXVqGtwDTWpC73RPIGDuAovmMqsMdIKvQF4DFO4I0k5Sr6g/gF4xE7iUfYj9NZq6aEdXzCYVzFwfBNxlrFZjzBFTyVPplc+gPvcRtvcQi9eBnEc7HvjQveYSw4z/JoyitckBS5geco40gQy+G7HpjzcfGpLIYpi6Zck37jT9zCTUnzS7iIbVFNXSiVdUxju6JR7MCvSLA1nlfXMZWd09jEbFQxgs9Yif3uiP010n8AqlVkrMXSsDYAAAAASUVORK5CYII=',
      isActive: false,
      // 大小，可选值为 small large
      size: 'large',
      // a-drawer内容滚动
      bodyStyle: {
        height: 'calc(100vh - 114px)',
        'overflow-y': 'auto',
        /* '-webkit-box-shadow': '-2px 0 6px 0 rgb(75 82 94 / 20%)',
        'box-shadow': '-2px 0 6px 0 rgb(75 82 94 / 20%)',
        '-webkit-box-sizing': 'border-box',
        'box-sizing': 'border-box',
        '-webkit-transition': 'all .3s ease',
        '-o-transition': 'all ease .3s',
        transition: 'all .3s ease', */
      },
    };
  },
  computed: {
    /**
     * 是否手机
     * @returns
     */
    isMobile: () => {
      return scale.isMobile();
    },
    /**
     * 侧边宽度
     * @returns
     */
    drawerWidth() {
      return (width) => {
        if (!width) {
          width = '40%';
        }
        return scale.isMobile() ? '100%' : width;
      };
    },
    /**
     * 审批配置审批人Radio组件样式
     * @returns
     */
    radioStyle: () => {
      return {
        display: 'block',
        height: '22px',
        lineHeight: '22px',
        'margin-bottom': '16px',
      };
    },
    /**
     * 审批配置审批人Radio组件样式
     * @returns
     */
    approvalRadioStyle: () => {
      const width = scale.isMobile() ? '45%' : '31%';
      return {
        width: width,
        lineHeight: '22px',
        marginBottom: '16px',
      };
    },
  },
  methods: {
    uuid() {
      return getId();
    },
    /**
     * 打开侧边配置
     * @param {*} name
     * @param {*} node
     * @param {*} routeNode
     */
    open(name, node, routeNode) {
      // 高亮
      this.isActive = true;
      //  打开配置
      this.$refs[name].showDrawer(node, routeNode);
    },

    /**
     * 删除节点
     * @param {*} node
     * @param {*} fun
     */
    delNode(node, fun) {
      const me = this;
      this.$confirm({
        title: '删除提示!',
        content: '您确定要删除当前节点吗?',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          me.$store.dispatch('flow/delNode', node);
          // 回调
          if (fun) {
            fun();
          }
        },
        onCancel() {},
      });
    },
    /**
     * 删除分支节点
     * @param {*} node
     */
    addBranch(node) {
      this.$store.dispatch('flow/addBranch', node);
    },
  },
};
