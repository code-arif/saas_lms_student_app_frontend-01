import { useQuery } from '@tanstack/react-query';
import { certificateService } from '../services/certificateService';

export const useCertificates = () => {
  return useQuery({
    queryKey: ['certificates'],
    queryFn: () => certificateService.getCertificates(),
  });
};

export const useCertificate = (uuid: string) => {
  return useQuery({
    queryKey: ['certificate', uuid],
    queryFn: () => certificateService.getCertificate(uuid),
    enabled: !!uuid,
  });
};
