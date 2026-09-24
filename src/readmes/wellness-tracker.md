# 🌈 Emotional Wellness Tracker

A modern, React-based web application for tracking and understanding your emotional well-being. This static frontend application can be deployed to AWS S3 for easy, scalable hosting.

## Features

- **Mood Tracking**: Log your daily mood on a 1-5 scale with detailed intensity tracking
- **Mood Journaling**: Add notes to understand what triggered your emotions
- **Emotional Tags**: Categorize your feelings with custom tags (e.g., work, family, stress)
- **Visual Analytics**: View your mood distribution and trends over time
- **Local Storage**: All data is stored securely in your browser's local storage
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Beautiful UI**: Modern gradient design with emoji feedback

## Tech Stack

- **React 19**: Modern UI library with hooks
- **TypeScript**: For type-safe development
- **Vite**: Ultra-fast build tool
- **CSS3**: Custom styling with CSS variables and gradients

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Navigate to the project directory:
```bash
cd aws-project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173` with hot module replacement enabled.

### Development

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run code linting

## Deployment to AWS S3

### Prerequisites

- AWS Account with S3 access
- AWS CLI installed and configured
- S3 bucket created in your AWS account

### Step-by-Step Deployment

1. **Build the production version:**
```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

2. **Create/Configure S3 Bucket** (if you haven't already):
```bash
aws s3 mb s3://your-bucket-name --region us-east-1
```

3. **Enable Static Website Hosting:**
```bash
aws s3 website s3://your-bucket-name \
  --index-document index.html \
  --error-document index.html
```

Note: Setting error-document to index.html enables client-side routing to work properly.

4. **Make Bucket Public** (create a bucket policy):
```bash
aws s3api put-bucket-policy --bucket your-bucket-name --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}'
```

5. **Upload the build files to S3:**
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

6. **Add cache headers** (optional but recommended):
```bash
aws s3 sync dist/ s3://your-bucket-name \
  --delete \
  --cache-control "max-age=31536000" \
  --exclude "index.html"

aws s3 cp dist/index.html s3://your-bucket-name/index.html \
  --content-type "text/html" \
  --cache-control "max-age=0,no-cache,no-store,must-revalidate"
```

7. **Access your site:**
- Your app is now live at: `http://your-bucket-name.s3-website-us-east-1.amazonaws.com`

### Optional: Use CloudFront for HTTPS and CDN

For HTTPS and better performance, use CloudFront:

1. Create a CloudFront distribution pointing to your S3 bucket
2. Configure SSL/TLS certificate (use AWS Certificate Manager)
3. Add your custom domain (via Route 53)

### Automated Deployment Script

Create a `deploy.sh` file for easier deployments:

```bash
#!/bin/bash

BUCKET_NAME="your-bucket-name"

echo "Building the application..."
npm run build

echo "Deploying to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME --delete

echo "Setting cache headers..."
aws s3 sync dist/ s3://$BUCKET_NAME \
  --delete \
  --cache-control "max-age=31536000" \
  --exclude "index.html"

aws s3 cp dist/index.html s3://$BUCKET_NAME/index.html \
  --content-type "text/html" \
  --cache-control "max-age=0,no-cache,no-store,must-revalidate"

echo "Deployment complete!"
```

Make it executable:
```bash
chmod +x deploy.sh
```

Then deploy with:
```bash
./deploy.sh
```

## Data Privacy & Storage

- **Local Storage**: All mood entries are stored in browser local storage
- **No Server Uploads**: Your emotional data never leaves your device
- **No Tracking**: No analytics or tracking cookies
- **Clear Data**: You can clear your browser data to remove all entries

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Architecture

### Components

- **MoodEntry**: Form component for logging daily moods
- **MoodHistory**: Displays all mood entries in chronological order
- **MoodStats**: Shows analytics and mood distribution

### Data Flow

1. User fills out mood form
2. Data saved to browser local storage via utility functions
3. Components re-render with updated data
4. User can view history and statistics

## Customization

### Change Colors

Edit `src/types.ts` to modify mood colors:
```typescript
export const MOOD_COLORS: Record<MoodLevel, string> = {
  1: '#your-color',
  2: '#your-color',
  // ...
};
```

### Modify Mood Levels

Change the scale in `src/types.ts` by modifying `MoodLevel` type and `MOOD_LABELS`.

## Future Enhancements

- Export data as CSV/JSON
- Mood trends over longer periods
- Integration with calendar
- Mobile app version
- Cloud sync with authentication
- Mood predictions with AI

## License

MIT License - Feel free to use and modify for personal use.

## Support

For issues, questions, or improvements, feel free to reach out.

---

**Built with ❤️ for emotional wellness**
