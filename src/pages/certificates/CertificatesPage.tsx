import React from 'react';
import { PageTitle } from '@/components/common/PageTitle';
import { CertificateCard } from '@/features/certificates/components/CertificateCard';
import { useCertificates } from '@/features/certificates/hooks/useCertificates';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';
import { Award } from 'lucide-react';

const CertificatesPage = () => {
  const { data: certsResponse, isLoading } = useCertificates();

  return (
    <div className="space-y-8">
      <PageTitle 
        title="My Certificates" 
        subtitle="View and download certificates you've earned upon completing courses."
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="aspect-[1.414/1] rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : certsResponse?.data && certsResponse.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certsResponse.data.map((cert) => (
            <CertificateCard key={cert.uuid} certificate={cert} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No certificates yet"
          description="Complete your first course to earn a certificate of achievement!"
          icon={Award}
          actionLabel="Browse Courses"
          onAction={() => {}} // Navigate to browse
        />
      )}
    </div>
  );
};

export default CertificatesPage;
